import "ojs/ojlabel";
import "ojs/ojtable";
import "ojs/ojtoolbar";
import { useState } from 'react';
import { ojMenu } from "ojs/ojmenu";
import { ButtonComponent } from "../button/ButtonComponent";
import { OptionComponent } from "../options/OptionComponent";
import { Action, ActionBarElement, ActionOrView, DefaultProperties, CONSTANTS } from "./metadata";
export { Action, ActionBarElement };

export interface ActionBarProps {
    actions: ActionBarElement[],
    filterHandler?: (value: string) => void
}

export const ActionBar = (props: ActionBarProps) => {
    const { actions, filterHandler } = props;
    return (
        <div id="toolbars">
            <div class="oj-toolbar-row oj-toolbars">
                <oj-toolbar id="toolbar1" aria-label="Navigation toolbar">
                    <ActionMenu actions={actions} />
                    <ViewMenu actions={actions} />
                    <ActionButtons actions={actions} />
                    {filterHandler && <FilterData handler={filterHandler} />}
                </oj-toolbar>
            </div>
        </div>
    )
}

/* Buttons that are displayed in the action bar */
const ActionButtons = (props: { actions: ActionBarElement[] }) => {
    const { actions } = props;
    const hasActions = Array.isArray(actions) && actions.length > 0;

    const IconButton = (props: { action: ActionBarElement }) => {
        const { action } = props;
        const defaultProperties = DefaultProperties[action.type];
        const title = action.title || defaultProperties.title;
        const icon = action.icon || defaultProperties.icon;

        return <>
            {action.hasStartSeperator && <Seperator />}
            <ButtonComponent
                buttonTitle={title}
                icon={icon}
                disabled={action.disable}
                ojAction={action.action}
            />
        </>
    }

    return <>
        {hasActions && actions.map((action) => {
            return <IconButton action={action} />
        })}
    </>
}

/* Common component used by action menu and view menu */
type MenuButtonProps = {
    actions: ActionBarElement[];
    menuSelection: ActionOrView;
    filterCondition: (action: ActionBarElement) => boolean;
}

const MenuButton = (props: MenuButtonProps) => {
    const { actions, menuSelection, filterCondition } = props;
    const menuActions = actions.filter(filterCondition);
    const hasMenu = Array.isArray(menuActions) && menuActions.length > 0;
    const menuId = menuSelection === "Actions" ? CONSTANTS.ActionMenuId : CONSTANTS.ViewMenuId;

    const MenuOption = (props: { action: ActionBarElement }) => {
        const { action } = props;
        const defaultProperties = DefaultProperties[action.type];

        //if showIcon property is present, show icon passed in props. 
        //Otherwise if default selection is set, show the default icon. If both not set, do not set icon
        let icon: string | undefined = undefined;
        let title = action.title || defaultProperties.title;
        if (menuSelection == "Actions") {
            title = action.inActionMenu?.optionTitle || action.title || defaultProperties.title;
            icon = action.inActionMenu?.showIcon ? action.icon : (defaultProperties.defaultSelection == "Actions" ? defaultProperties.icon : undefined);
        } else {
            icon = action.inViewMenu?.showIcon ? action.icon : (defaultProperties.defaultSelection == "View" ? defaultProperties.icon : undefined);
        }

        //closes menu before proceeding action
        const customAction = () => {
            closeMenu(menuId);
            action.action();
        }

        //submenu currently only supported in action menu
        const subMenu = action.inActionMenu?.submenu;
        return subMenu ? <>{subMenu()}</> : (
            <OptionComponent
                optTitle={title}
                icon={icon}
                ojAction={customAction}
                disabled={action.disable}
            />
        );
    };

    return hasMenu ?
        <>
            <oj-menu-button>
                {menuSelection}
                <oj-menu slot="menu" id={menuId} onMouseLeave={(event) => closeMenu(menuId)}>
                    {menuActions.map((action) => {
                        return <MenuOption key={action.type} action={action} />;
                    })}
                </oj-menu>
            </oj-menu-button>
            <Seperator />
        </>
        : <></>;
};

const ActionMenu = (props: { actions: ActionBarElement[] }) => {
    const filterActionMenuOptions = (action: ActionBarElement) => {
        const defaultProperties = DefaultProperties[action.type];
        return !!action.inActionMenu?.present || defaultProperties.defaultSelection == "Actions"
    }
    return (
        <MenuButton
            actions={props.actions}
            menuSelection="Actions"
            filterCondition={filterActionMenuOptions}
        />
    );
};

const ViewMenu = (props: { actions: ActionBarElement[] }) => {
    const filterViewMenuOptions = (action: ActionBarElement) => {
        const defaultProperties = DefaultProperties[action.type];
        return !!action.inViewMenu?.present || defaultProperties.defaultSelection == "View"
    }
    return (
        <MenuButton
            actions={props.actions}
            menuSelection="View"
            filterCondition={filterViewMenuOptions}
        />
    );
};

const FilterData = (props: { handler: (value: string) => void }) => {
    const [filter, setFilter] = useState<string>('');

    const valueChangeHandler = (event: any) => {
        const value = event.detail.value;
        setFilter(value);
        props.handler(value);
    }

    return (
        <>
            <Seperator />
            <oj-input-text
                id="filter"
                label-hint="Filter"
                label-edge="inside"
                value={filter}
                placeholder="Type to filter"
                onrawValueChanged={valueChangeHandler}
                clearIcon="always"
                style={{ width: 300, marginLeft: 10 }}
            />
        </>

    )
}

const Seperator = () => {
    return (<span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"></span>);
}

const closeMenu = (id: string) => {
    const menu = document.getElementById(id) as ojMenu;
    menu?.close();
}
