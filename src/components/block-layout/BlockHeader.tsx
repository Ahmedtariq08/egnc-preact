import { ButtonComponent } from "../../common/button/ButtonComponent";
import {
    LoaderCircle,
    type CustomLoader,
} from "../../common/loader/LoaderCircle";

interface Props {
    headerTitle: string;
    loader: CustomLoader;
    saveAction?: () => void;
    editAction?: () => void;
    resetAction?: () => void;
}
const CLASSES = { MD4: "oj-flex-item oj-md-4", BTN_SM: "oj-button-sm" };
const CONSTANTS = { SAVE: "Save", EDIT: "Edit", RESET: "Reset" };

export const BlockHeader = (props: Props) => {
    const { headerTitle, loader, saveAction, editAction, resetAction } = props;
    return (
        <div className="oj-flex oj-sm-flex-direction-row">
            <div className={"oj-flex-item oj-md-4"}>
                <h5 className="left-pad">{headerTitle}</h5>
            </div>
            <div className={"oj-flex-item oj-md-4"}>
                <LoaderCircle {...loader} />
            </div>
            <div
                id={"buttonsWithLeftPadding"}
                className={`oj-flex oj-md-4 oj-md-align-items-center oj-md-justify-content-flex-end`}
            >
                {saveAction ? (
                    <ButtonComponent
                        buttonTitle={CONSTANTS.SAVE}
                        styleClass={CLASSES.BTN_SM}
                        chroming="callToAction"
                        ojAction={saveAction}
                    ></ButtonComponent>
                ) : null}
                {editAction ? (
                    <ButtonComponent
                        buttonTitle={CONSTANTS.EDIT}
                        styleClass={CLASSES.BTN_SM}
                        ojAction={editAction}
                    ></ButtonComponent>
                ) : null}
                {resetAction ? (
                    <ButtonComponent
                        buttonTitle={CONSTANTS.RESET}
                        styleClass={CLASSES.BTN_SM}
                        ojAction={resetAction}
                    ></ButtonComponent>
                ) : null}
            </div>
        </div>
    );
};
