import { type h } from "preact";
import { DefaultIcons } from "../[constants]/Icons";

export const CONSTANTS = {
    ActionMenuId: "myActionsMenu",
    ViewMenuId: "myViewMenu",
};

export enum Action {
    Export = "Export",
    ReorderColumns = "ReorderColumns",
    AddColumn = "AddColumns",
    ExpandAll = "ExpandAll",
    CollapseAll = "CollapseAll",
    Refresh = "Refresh",
    Create = "Create",
    Delete = "Delete",
    Update = "Update",
    Reset = "Reset",
    Download = "Download",
    Upload = "Upload",
    Misc = "Misc",
}

export type ActionOrView = "Actions" | "View";
interface DefaultProperty {
    title: string;
    icon: string;
    defaultSelection?: ActionOrView;
}

export const DefaultProperties: { [key in Action]: DefaultProperty } = {
    [Action.Export]: {
        title: "Export",
        icon: DefaultIcons.exportFile,
        defaultSelection: "Actions",
    },
    [Action.ReorderColumns]: {
        title: "Reorder Columns",
        icon: DefaultIcons.reorderColumns,
        defaultSelection: "View",
    },
    [Action.AddColumn]: {
        title: "Add Columns",
        icon: DefaultIcons.addColumns,
        defaultSelection: "View",
    },
    [Action.ExpandAll]: {
        title: "Expand All",
        icon: DefaultIcons.expandAll,
        defaultSelection: "View",
    },
    [Action.CollapseAll]: {
        title: "Collapse All",
        icon: DefaultIcons.collapseAll,
        defaultSelection: "View",
    },
    [Action.Refresh]: { title: "Refresh", icon: DefaultIcons.refresh },
    [Action.Create]: { title: "Create", icon: DefaultIcons.create },
    [Action.Delete]: { title: "Delete", icon: DefaultIcons.delete },
    [Action.Update]: { title: "Update", icon: DefaultIcons.update },
    [Action.Reset]: { title: "Reset", icon: DefaultIcons.reset },
    [Action.Download]: { title: "Download", icon: DefaultIcons.download },
    [Action.Upload]: { title: "Upload", icon: DefaultIcons.upload },
    [Action.Misc]: { title: "[Custom Element]", icon: "" },
};

interface BaseActionViewProps {
    present: true;
    showIcon?: boolean;
}

interface ActionMenuProps extends BaseActionViewProps {
    optionTitle?: string;
    submenu?: () => h.JSX.Element; // should return oj-option jsx
}

export interface ActionBarElement {
    type: Action;
    action: () => void;
    disable?: boolean;
    title?: string; // custom title overrides default
    icon?: string; // custom icon overrides default, used in misc cases where icon is not mapped
    hasStartSeperator?: true;
    inActionMenu?: ActionMenuProps; // pass either of these two.
    inViewMenu?: BaseActionViewProps; // submenu should contain complete jsx of oj-menu
}

/*
/* Sample submenu function jsx */
// <oj-option>
//     <span class={someClass} slot="startIcon"></span>Some title
//     <oj-menu>
//         <oj-option>Option1</oj-option>
//         <oj-option>Option2</oj-option>
//         <oj-option>Option3</oj-option>
//     </oj-menu>
// </oj-option>
