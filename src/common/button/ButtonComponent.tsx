export interface ButtonProps {
    buttonTitle: string;
    icon?: string;
    disabled?: boolean;
    styleClass?: string;
    ojAction?: (event?: unknown) => void;
    chroming?:
        | "borderless"
        | "solid"
        | "outlined"
        | "callToAction"
        | "danger"
        | "full"
        | "half";
}

/**
 * @description A common button component.
 *  If icon is given, it will only render the icon as a button
 *  (commonly used in action bar). With no icon, it renders the default button.
 * @returns oj-button either as only icon or default button
 */
export const ButtonComponent = (props: ButtonProps) => {
    const {
        buttonTitle,
        icon,
        disabled = false,
        ojAction,
        styleClass,
        chroming,
    } = props;
    const chromingToApply = chroming ?? (icon ? "borderless" : undefined);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buttonClick = (event: any) => {
        ojAction && ojAction(event);
    };

    const buttonWithIcon = () => {
        return (
            <oj-button
                chroming={chromingToApply}
                class={styleClass}
                display="icons"
                onojAction={buttonClick}
                disabled={disabled}
            >
                <span className={icon} slot={"startIcon"}></span>
                {buttonTitle}
            </oj-button>
        );
    };

    const buttonWithoutIcon = () => {
        return (
            <oj-button
                title={buttonTitle}
                class={styleClass}
                onojAction={buttonClick}
                disabled={disabled}
                chroming={chromingToApply}
            >
                {buttonTitle}
            </oj-button>
        );
    };

    return icon ? buttonWithIcon() : buttonWithoutIcon();
};
