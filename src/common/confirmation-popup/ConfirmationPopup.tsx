import { customElement, ExtendGlobalProps } from "ojs/ojvcomponent";
import { h, Component, ComponentChild } from "preact";
import { ojDialog } from "ojs/ojdialog";
import "ojs/ojdialog";
import { Popup } from "../popup/Popup";

/**
   * @Note
   * Provide modal Id as optional and in caller functions 
   * pass same id that is given in props
   */

type Props = {
    message: string;
    okAction: () => void;
    popupId?: string;
    dialogTitle?: string;
    okText?: string;
    cancelText?: string;
}

const DEFAULTS = {
    ID: "confirmationPopup",
    TITLE: "Confirmation",
    OK: "OK",
    CANCEL: "Cancel"
}

const SLOTS = {
    BODY: "body",
    FOOTER: "footer"
}

export const ConfirmationPopup = (props: Props) => {
    const { popupId = DEFAULTS.ID, dialogTitle = DEFAULTS.TITLE, message,
        okAction, okText = DEFAULTS.OK, cancelText = DEFAULTS.CANCEL } = props;

    const button = (action: () => void, text: string) => {
        return (<oj-button onojAction={action}>{text}</oj-button>)
    }

    const closeConfirmationPopup = () => {
        getElement(null, popupId).close();
    }

    return (
        <oj-dialog id={popupId} dialog-title={dialogTitle}>
            <div slot={SLOTS.BODY}>
                {message}
            </div>
            <div slot={SLOTS.FOOTER}>
                {button(okAction, okText)}
                {button(closeConfirmationPopup, cancelText)}
            </div>
        </oj-dialog>
    );
}

interface CustomPopupProps {
    show: boolean,
    closePopup: () => void,
    okAction: () => void,
    message: string
    popupTitle?: string,
    okText?: string,
    cancelText?: string
}

export const CustomConfirmationPopup = (props: CustomPopupProps) => {
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

export const openConfirmationPopup = (event?: any, id?: string) => {
    getElement(event, id).open();
}

export const closeConfirmationPopup = (event?: any, id?: string) => {
    getElement(event, id).close();
}

const getElement = (event?: any, id?: string) => {
    return (document.getElementById((id) ? id : DEFAULTS.ID) as ojDialog);
}
