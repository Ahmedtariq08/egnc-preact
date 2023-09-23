import { observer } from "mobx-react-lite";
import 'ojs/ojinputtext';
import 'ojs/ojprogress-circle';
import { useEffect } from 'react';
import { ButtonComponent } from "../../../common/button/ButtonComponent";
import { Icons } from "../../../constants/iconsData";
import { useAdminPanelStore } from "../../../modules/admin-panel/adminPanelStore";
import { Cloud, ConfigData } from "../../../modules/admin-panel/general-config/generalConfigService";

const CLASSES = {
    FLEX_ITEM: "oj-flex-item oj-sm-padding-8x-horizontal oj-sm-margin-8x-vertical",
    FLEX_ITEM_ROW: "oj-flex oj-sm-flex-direction-row",
    PADDING_2X: "oj-flex oj-sm-padding-2x-horizontal",
    PADDING_0_VERTICAL: "oj-sm-padding-0-vertical",
    ALIGN_CENTER: "oj-md-align-items-center",
    JUSTIFY_CENTER: "justifyInCenter",
    SM_BTN: "oj-button-sm",
}

const CONSTANTS = {
    TITLE_PAGE: "General Configuration",
    CLOUD: { TITLE: "Oracle Cloud Link" },
    THRESHOLD: { TITLE: "Threshold Tolerance %", MAX: 100, MIN: 0, STEP: 1 },
    PREVENT: { TITLE: "Prevent declaration submission on unknown substance presence" },
    COMPANY: { TITLE: "Company Name", MAX_CHAR: 50 },
    FOLLOWUP: { TITLE: "Follow up Supplier (days)", MAX: 15, MIN: 0, STEP: 1 }
}

const elementClass = (md: number, optionalClass?: string) => {
    return (`oj-md-${md} ${CLASSES.PADDING_2X} ${optionalClass}`);
}

export const GeneralConfigurationTab = observer(() => {
    const { generalConfigStore } = useAdminPanelStore();
    const { loadGeneralConfigurations } = generalConfigStore;

    useEffect(() => {
        loadGeneralConfigurations();
    }, [loadGeneralConfigurations]);

    return (
        <div class="oj-sm-margin-2x">
            <h5>{CONSTANTS.TITLE_PAGE}</h5>
            <div class="oj-panel">
                <div class="oj-flex oj-sm-flex-direction-column">
                    <FirstRow />
                    <hr></hr>
                    <SecondRow />
                    <hr></hr>
                    <ThirdRow />
                </div>
            </div>
        </div>
    )
});

const FirstRow = observer(() => {
    const { generalConfigStore: { configData, updateConfigValue } } = useAdminPanelStore();
    const { value, disabled } = configData.cloud;

    const valueChangeHandler = (event: any) => {
        const newUri = event.detail.value;
        let newCloudData = { ...value } as Cloud;
        newCloudData.authorizationUri = newUri;
        updateConfigValue('cloud', newCloudData)
    }

    return (
        <div class={CLASSES.FLEX_ITEM}>
            <div class={CLASSES.FLEX_ITEM_ROW}>
                <div class={elementClass(2, CLASSES.ALIGN_CENTER)}>
                    <b>{CONSTANTS.CLOUD.TITLE}</b>
                </div>
                <oj-input-text
                    disabled={disabled}
                    spellcheck={false}
                    value={value?.authorizationUri}
                    onvalueChanged={valueChangeHandler}
                    class={elementClass(8)}
                ></oj-input-text>
                <ActionButtons configKey='cloud' />
            </div>
        </div>)
});

const SecondRow = observer(() => {
    const { generalConfigStore: { configData, updateConfigValue } } = useAdminPanelStore();
    const { thresholdTolerance, substancePrevention } = configData;

    return (
        <div class={CLASSES.FLEX_ITEM}>
            <div class={CLASSES.FLEX_ITEM_ROW}>
                <div class={elementClass(2, CLASSES.ALIGN_CENTER)}>
                    <b>{CONSTANTS.THRESHOLD.TITLE}</b>
                </div>
                <oj-input-number
                    disabled={thresholdTolerance.disabled}
                    spellcheck={false}
                    onvalueChanged={(event) => updateConfigValue('thresholdTolerance', event.detail.value!)}
                    value={thresholdTolerance.value}
                    max={CONSTANTS.THRESHOLD.MAX}
                    min={CONSTANTS.THRESHOLD.MIN}
                    step={CONSTANTS.THRESHOLD.STEP}
                    class={elementClass(2)}
                ></oj-input-number>
                <ActionButtons configKey="thresholdTolerance" />
                <div class="oj-md-1"></div>
                <div class={elementClass(3, CLASSES.ALIGN_CENTER)}>
                    <b>{CONSTANTS.PREVENT.TITLE}</b>
                </div>
                <oj-combobox-one
                    disabled={substancePrevention.disabled}
                    value={substancePrevention.value}
                    onvalueChanged={(event) => updateConfigValue('substancePrevention', event.detail.value)}
                    class={elementClass(2)}>
                    <oj-option value={"yes"}>Yes</oj-option>
                    <oj-option value={"no"}>No</oj-option>
                </oj-combobox-one>
                <ActionButtons configKey="substancePrevention" />
            </div>
        </div>
    )
});

const ThirdRow = observer(() => {
    const { generalConfigStore: { configData, updateConfigValue } } = useAdminPanelStore();
    const { company, followUpDays } = configData;

    return (
        <div class={CLASSES.FLEX_ITEM}>
            <div class={CLASSES.FLEX_ITEM_ROW}>
                <div class={elementClass(2, CLASSES.ALIGN_CENTER)}>
                    <b>{CONSTANTS.COMPANY.TITLE}</b>
                </div>
                <oj-input-text
                    disabled={company.disabled}
                    spellcheck={false}
                    length={{ max: CONSTANTS.COMPANY.MAX_CHAR }}
                    value={company.value}
                    onvalueChanged={(event) => updateConfigValue('company', event.detail.value)}
                    class={elementClass(2)}
                ></oj-input-text>
                <ActionButtons configKey='company' />
                <div class="oj-md-1"></div>
                <div class={elementClass(3, CLASSES.ALIGN_CENTER)}>
                    <b>{CONSTANTS.FOLLOWUP.TITLE}</b>
                </div>
                <oj-input-number
                    disabled={followUpDays.disabled}
                    spellcheck={false}
                    onvalueChanged={(event) => updateConfigValue('followUpDays', event.detail.value!)}
                    value={followUpDays.value}
                    max={CONSTANTS.FOLLOWUP.MAX}
                    min={CONSTANTS.FOLLOWUP.MIN}
                    step={CONSTANTS.FOLLOWUP.STEP}
                    class={elementClass(2)}
                ></oj-input-number>
                <ActionButtons configKey='followUpDays' />
            </div>
        </div>
    )
});

interface ActionButtonProps {
    configKey: keyof ConfigData
}
/* Buttons to render after every field*/
const ActionButtons = observer((props: ActionButtonProps) => {
    const { configKey } = props;
    const { generalConfigStore: { configData, editAction, saveConfigValue, resetConfigValue } } = useAdminPanelStore();
    const config = configData[configKey];
    const { loading, disabled } = config;

    return (
        <div class={CLASSES.JUSTIFY_CENTER}>
            {(loading ?
                <oj-progress-circle
                    size={"sm"}
                    value={-1}
                /> :
                (disabled ?
                    <ButtonComponent
                        buttonTitle="Edit"
                        ojAction={() => editAction(configKey)}
                        icon={Icons.icons.edit}
                        styleClass={CLASSES.SM_BTN}
                    /> :
                    <oj-toolbar
                        data-oj-clickthrough="disabled"
                        chroming="borderless"
                        class={CLASSES.PADDING_0_VERTICAL}>
                        <ButtonComponent
                            buttonTitle="Save"
                            ojAction={() => saveConfigValue(configKey)}
                            icon={Icons.icons.check}
                            styleClass={CLASSES.SM_BTN}
                        />
                        <ButtonComponent
                            buttonTitle="Cancel"
                            ojAction={() => resetConfigValue(configKey)}
                            icon={Icons.icons.multiply}
                            styleClass={CLASSES.SM_BTN}
                        />
                    </oj-toolbar>
                )
            )}
        </div>
    );
});