import { ButtonComponent } from "../../common/button/ButtonComponent";
import { LoaderCircle, CustomLoader } from "../../common/loader/LoaderCircle";

type Props = {
    headerTitle: string,
    loader: CustomLoader,
    saveAction?: () => void,
    editAction?: () => void,
    resetAction?: () => void
}
const CLASSES = { MD4: "oj-flex-item oj-md-4", BTN_SM: "oj-button-sm" }
const CONSTANTS = { SAVE: "Save", EDIT: "Edit", RESET: "Reset" }

export const BlockHeader = (props: Props) => {
    const { headerTitle, loader, saveAction, editAction, resetAction } = props;
    return (
        <div class="oj-flex oj-sm-flex-direction-row">
            <div class={"oj-flex-item oj-md-4"}>
                <h5 class="left-pad">{headerTitle}</h5>
            </div>
            <div class={"oj-flex-item oj-md-4"}>
                <LoaderCircle {...loader} />
            </div>
            <div
                id={'buttonsWithLeftPadding'}
                class={`oj-flex oj-md-4 oj-md-align-items-center oj-md-justify-content-flex-end`}>
                {saveAction ?
                    <ButtonComponent
                        buttonTitle={CONSTANTS.SAVE}
                        styleClass={CLASSES.BTN_SM}
                        chroming="callToAction"
                        ojAction={saveAction}
                    ></ButtonComponent>
                    : null}
                {editAction ?
                    <ButtonComponent
                        buttonTitle={CONSTANTS.EDIT}
                        styleClass={CLASSES.BTN_SM}
                        ojAction={editAction}
                    ></ButtonComponent>
                    : null}
                {resetAction ?
                    <ButtonComponent
                        buttonTitle={CONSTANTS.RESET}
                        styleClass={CLASSES.BTN_SM}
                        ojAction={resetAction}
                    ></ButtonComponent>
                    : null}
            </div>
        </div>)
}