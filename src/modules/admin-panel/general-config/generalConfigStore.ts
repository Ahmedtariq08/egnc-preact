import { makeAutoObservable, runInAction } from "mobx";
import { Cloud, YesNo, ConfigData, intialConfigData, generalConfigApis, substancePreventionSuccessMessage, MessageMap } from "./generalConfigService";
import { store } from "../../../modules/store";

export default class GeneralConfigStore {
    configData: ConfigData = intialConfigData;

    constructor() {
        makeAutoObservable(this);
    }

    // Inital configuration load
    loadGeneralConfigurations = async () => {
        try {
            const [cloud, tolerance, prevention, company, followUp] = await Promise.all([
                generalConfigApis.getOracleCloudLink(),
                generalConfigApis.getThresholdTolerance(),
                generalConfigApis.getUnknownSubstanceSeverityPrevention(),
                generalConfigApis.getCompanyName(),
                generalConfigApis.getFollowUpDays()
            ]);
            runInAction(() => {
                this.configData = {
                    cloud: { ...intialConfigData.cloud, value: cloud, prev: { ...cloud } },
                    thresholdTolerance: { ...intialConfigData.thresholdTolerance, value: tolerance, prev: tolerance },
                    substancePrevention: { ...intialConfigData.substancePrevention, value: prevention, prev: prevention },
                    company: { ...intialConfigData.company, value: company, prev: company },
                    followUpDays: { ...intialConfigData.followUpDays, value: followUp, prev: followUp },
                }
            })
        } catch (error) {
            store.commonStore.showNotification("error", 'Error in fetching general configurations');
        }
    }

    editAction = <TKey extends keyof ConfigData>(key: TKey) => {
        this.configData[key].disabled = false;
    }

    resetConfigValue = <TKey extends keyof ConfigData>(key: TKey) => {
        this.configData[key].value = this.configData[key].prev;
        this.configData[key].disabled = true;
    }

    updateConfigValue = <TKey extends keyof ConfigData>(key: TKey, newValue: ConfigData[TKey]["value"]) => {
        this.configData[key] = { ...this.configData[key], value: newValue }
    }

    //Save
    saveConfigValue = async <TKey extends keyof ConfigData>(key: TKey) => {
        const config = this.configData[key];
        let { successMsg, errorMsg } = MessageMap[key];
        config.loading = true;
        try {
            switch (key) {
                case 'cloud':
                    await generalConfigApis.updateOracleCloudLink(config.value! as Cloud);
                    break;
                case 'company':
                    await generalConfigApis.updateCompanyName(config.value! as string);
                    break;
                case 'followUpDays':
                    await generalConfigApis.updateFollowUpDays(config.value! as number);
                    break;
                case 'substancePrevention':
                    await generalConfigApis.updateUnknownSubstanceSeverityPrevention(config.value! as YesNo);
                    break;
                case 'thresholdTolerance':
                    await generalConfigApis.updateThresholdTolerance(config.value! as number);
                    break;
            }
            runInAction(() => {
                config.disabled = true;
                config.prev = config.value;
            });
            if (key === 'substancePrevention') {
                successMsg = substancePreventionSuccessMessage(config.value! as YesNo);
            }
            store.commonStore.showNotification('confirmation', successMsg);
        } catch (error) {
            runInAction(() => {
                config.value = config.prev;
            });
            store.commonStore.showNotification('error', errorMsg);
        } finally {
            runInAction(() => {
                config.loading = false;
            })
        }
    }
}