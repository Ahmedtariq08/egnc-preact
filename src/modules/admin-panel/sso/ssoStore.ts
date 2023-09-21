import { makeAutoObservable, runInAction } from "mobx";
import { SSO, SSOApis } from "./ssoService";
import { store } from "src/modules/store";
import { areObjectsEqual } from "src/utils/generic";

export default class SsoStore {
    sso: SSO | undefined = undefined;
    prevSso: SSO | undefined = undefined;
    editDisabled = true;
    loadingSso = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadSso = async () => {
        this.loadingSso = true;
        try {
            const sso = await SSOApis.getSSO();
            runInAction(() => {
                this.sso = sso;
                this.prevSso = sso;
            })
        } catch (error) {
            store.commonStore.showNotification("error", "Unable to fetch Single Sign On.")
        } finally {
            runInAction(() => {
                this.loadingSso = false;
            })
        }
    }

    editAction = () => {
        this.editDisabled = false;
    }

    resetAction = () => {
        this.sso = this.prevSso;
        this.editDisabled = true;
    }

    //Save action
    updateSso = async () => {
        if (!areObjectsEqual(this.sso!, this.prevSso!)) {
            this.loadingSso = true;
            try {
                await SSOApis.updateSSO(this.sso!);
                runInAction(() => {
                    this.editDisabled = true;
                    this.prevSso = this.sso;
                });
                store.commonStore.showNotification("confirmation", "Single Sign-On updated successfully.")
            } catch (error) {
                store.commonStore.showNotification("error", "Unable to update Single Sign-On.")
            } finally {
                runInAction(() => {
                    this.loadingSso = false;
                })
            }

        } else {
            store.commonStore.showNotification("warning", "Nothing to save");
        }
    }

}