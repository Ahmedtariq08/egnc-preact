import { observer } from "mobx-react-lite";
import 'ojs/ojinputtext';
import 'ojs/ojprogress-circle';
import { useEffect, useState } from 'react';
import { ButtonComponent } from "../../../common/button/ButtonComponent";
import { Icons } from "../../../constants/iconsData";
import { useAdminPanelStore } from "../../../modules/admin-panel/adminPanelStore";
import { Cloud, ConfigData } from "../../../modules/admin-panel/general-config/generalConfigService";

export const CLASSES = {
    FLEX_ITEM: "oj-flex-item oj-sm-padding-8x-horizontal oj-sm-margin-8x-vertical",
    FLEX_ITEM_ROW: "oj-flex oj-sm-flex-direction-row",
    PADDING_2X: "oj-flex-item oj-sm-padding-2x-horizontal",
    PADDING_0_VERTICAL: "oj-sm-padding-0-vertical",
    ALIGN_CENTER: "object-divider",
    JUSTIFY_CENTER: "justifyInCenter",
    SM_BTN: "oj-button-sm",
}

export const CONSTANTS = {
    TITLE_PAGE: "General Configuration",
    CLOUD: { TITLE: "Oracle Cloud Link" },
    THRESHOLD: { TITLE: "Threshold Tolerance %", MAX: 100, MIN: 0, STEP: 1 },
    PREVENT: { TITLE: "Prevent declaration submission on unknown substance presence" },
    COMPANY: { TITLE: "Company Name", MAX_CHAR: 50 },
    FOLLOWUP: { TITLE: "Follow up Supplier (days)", MAX: 15, MIN: 0, STEP: 1 }
}

export const elementClass = (md: number, optionalClass?: string) => {
    return (`oj-md-${md} ${CLASSES.PADDING_2X} ${optionalClass}`);
}

export const GeneralConfigurationTab = observer(() => {
    const { generalConfigStore } = useAdminPanelStore();
    const { configData, loadGeneralConfigurations, updateConfigValue } = generalConfigStore;

    useEffect(() => {
        loadGeneralConfigurations();
    }, [loadGeneralConfigurations]);



    return (
        <div class="oj-sm-margin-2x">
            <h5 class="left-pad">General Configuration</h5>
            <div class="oj-panel">
                <div class="oj-flex oj-sm-flex-direction-column">
                    <FirstRow />
                    <hr></hr>
                    {/* <SecondRow />
                    <hr></hr>
                    <ThirdRow /> */}
                </div>
            </div>
        </div>
    )
});

const FirstRow = observer(() => {
    const { generalConfigStore: { configData, updateConfigValue } } = useAdminPanelStore();
    const { value, disabled } = configData.cloud;

    const valueChangeHandler = (event: any) => {
        const { newUri } = event.detail;
        let newCloudData = { ...value } as Cloud;
        newCloudData.authorizationUri = newUri;
        updateConfigValue('cloud', newCloudData)
    }

    console.log(disabled);
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