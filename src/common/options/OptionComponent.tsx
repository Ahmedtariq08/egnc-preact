export interface OptionProps {
    icon?: string;
    optTitle: string;
    disabled?: boolean;
    ojAction: () => void;
}

const CLASSES = {
    disable: "oj-disabled",
    menuItem: "oj-menu-item",
};

/**
 * @description Options to be rendered inside a menu (commonly used in action bar)
 * @returns oj-option with icon (if present) at the start
 */
export const OptionComponent = (props: OptionProps) => {
    const { optTitle, icon, disabled, ojAction } = props;
    const menuClass = CLASSES.menuItem;
    const iconClass = icon ? `${icon} ${menuClass}-icon` : undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clickAction = (event: any) => {
        if (event && !disabled) {
            event.preventDefault();
            ojAction();
        }
    };

    return (
        <oj-option class={menuClass} onClick={clickAction} disabled={disabled}>
            {iconClass && <span className={iconClass} slot="startIcon"></span>}
            {optTitle}
        </oj-option>
    );
};
