import "ojs/ojdialog";
import "ojs/ojbutton";
import { Popup } from "../popup/Popup";

const DEFAULTS = {
    ID: "confirmationPopup",
    TITLE: "Confirmation",
    OK: "OK",
    CANCEL: "Cancel"
}

interface Props {
    show: boolean,
    closePopup: () => void,
    okAction: () => void,
    message: string
    popupTitle?: string,
    okText?: string,
    cancelText?: string
}

export const ConfirmationPopup = (props: Props) => {
    const { popupTitle = DEFAULTS.TITLE, message, show, closePopup,
        okAction, okText = DEFAULTS.OK, cancelText = DEFAULTS.CANCEL } = props;

    const okClicked = () => {
        okAction();
        closePopup();
    }

    const body = () => {
        return <div>{message}</div>
    }

    const footer = () => {
        return (
            <>
                <oj-button onojAction={okClicked}>{okText}</oj-button>
                <oj-button onojAction={closePopup}>{cancelText}</oj-button>
            </>
        )
    }

    return <Popup show={show} popupTitle={popupTitle} body={body} footer={footer} />
}
