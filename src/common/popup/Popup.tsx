import "ojs/ojdialog";
import { h } from "preact";
import { CustomLoader, LoaderCircle } from "../loader/LoaderCircle";

type Props = {
    show: boolean;
    popupTitle: string;
    body: () => h.JSX.Element;
    onClose?: () => void;
    footer?: () => h.JSX.Element;
    showCloseButton?: boolean;         //onClose must be passed for this to work
    showBackgroundLayer?: boolean;
    loader?: CustomLoader;          //will show loading state in body element
}

const DEFAULTS = {
    showCloseButton: false,
    showBackgroundLayer: true,
}

const CLASSES = {
    MAIN_CLASS: "popup",
    LAYER: "layer",
    INNER_CLASS: "popup-inner",
    FADE_OUT: "popup-fadeOut",
    FADE_IN: "popup-fadeIn"
}

export const Popup = (props: Props) => {
    const { show, popupTitle, body, footer, onClose, showCloseButton, showBackgroundLayer, loader } = { ...DEFAULTS, ...props };

    const fade = show ? CLASSES.FADE_IN : CLASSES.FADE_OUT;
    const popupClass = showBackgroundLayer ? `${CLASSES.MAIN_CLASS} ${CLASSES.LAYER}` : CLASSES.MAIN_CLASS;

    const dialog = () => {
        return (<div className={`${popupClass} ${fade}`}>
            <div className={`${CLASSES.INNER_CLASS} oj-draggable oj-dialog oj-component oj-complete oj-component-initnode`}>
                <div class="oj-dialog-container">
                    <div class="oj-dialog-header">
                        <h1 class="oj-dialog-title">{popupTitle}</h1>
                        {
                            showCloseButton &&
                            <oj-button id="closeButton" display="icons" chroming="half" title="Close" onojAction={onClose} >
                                <span class="oj-button-text">Close</span>
                                <span class="oj-button-icon oj-start oj-fwk-icon oj-fwk-icon-cross" slot="startIcon"></span>
                            </oj-button>
                        }
                    </div>
                    <div class="oj-dialog-content oj-dialog-default-content">
                        <div>
                            <div slot="body" class="oj-dialog-body">
                                {loader?.isLoading ? <LoaderCircle {...loader} /> : body()}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div slot="footer" class="oj-dialog-footer">
                            {footer ? footer() : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }

    return (show ? dialog() : null);
}

