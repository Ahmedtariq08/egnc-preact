import { h } from 'preact';
import { DefaultIcons } from '../[constants]/Icons';

export const CONSTANTS = {
    ActionMenuId: "myActionsMenu",
    ViewMenuId: "myViewMenu",
}

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
    Misc = "Misc"
}

export type ActionOrView = "Actions" | "View"
type DefaultProperty = {
    title: string,
    icon: string,
    defaultSelection?: ActionOrView
}

export const DefaultProperties: { [key in Action]: DefaultProperty } = {
    [Action.Export]: { title: "Export", icon: DefaultIcons.exportFile, defaultSelection: "Actions" },
    [Action.ReorderColumns]: { title: "Reorder Columns", icon: DefaultIcons.reorderColumns, defaultSelection: "View" },
    [Action.AddColumn]: { title: "Add Columns", icon: DefaultIcons.addColumns, defaultSelection: "View" },
    [Action.ExpandAll]: { title: "Expand All", icon: DefaultIcons.expandAll, defaultSelection: "View" },
    [Action.CollapseAll]: { title: "Collapse All", icon: DefaultIcons.collapseAll, defaultSelection: "View" },
    [Action.Refresh]: { title: "Refresh", icon: DefaultIcons.refresh },
    [Action.Create]: { title: "Create", icon: DefaultIcons.create },
    [Action.Delete]: { title: "Delete", icon: DefaultIcons.delete },
    [Action.Update]: { title: "Update", icon: DefaultIcons.update },
    [Action.Reset]: { title: "Reset", icon: DefaultIcons.reset },
    [Action.Download]: { title: "Download", icon: DefaultIcons.download },
    [Action.Upload]: { title: "Upload", icon: DefaultIcons.upload },
    [Action.Misc]: { title: "[Custom Element]", icon: "" },
}

interface BaseActionViewProps {
    present: true,
    showIcon?: boolean
}

interface ActionMenuProps extends BaseActionViewProps {
    optionTitle?: string,
    submenu?: () => h.JSX.Element //should return oj-option jsx
}

export type ActionBarElement = {
    type: Action,
    action: () => void,
    disable?: boolean,
    title?: string,     //custom title overrides default
    icon?: string       //custom icon overrides default, used in misc cases where icon is not mapped
    hasStartSeperator?: true,
    inActionMenu?: ActionMenuProps,  //pass either of these two.
    inViewMenu?: BaseActionViewProps,                                   //submenu should contain complete jsx of oj-menu
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

// const exportFile = () => {
//     console.log("exporting file");
// }
// const reorderColumns = () => {
//     console.log("open reorder popup");
// }
// const addColumns = () => {
//     console.log("open add columns popup");
// }

// const basicActions: ActionBarElement[] = [
//     { type: Action.Export, action: exportFile },
//     { type: Action.ReorderColumns, action: reorderColumns, hasStartSeperator: true },
//     { type: Action.AddColumn, action: addColumns }
// ]

// const testActions1: ActionBarElement[] = [
//     ...basicActions,
//     { type: Action.Delete, hasStartSeperator: true, action: () => { }, inActionMenu: { present: true } },
//     { type: Action.Create, action: () => { }, inActionMenu: { present: true } },
// ]

// const testingActions: ActionBarElement[] = [
//     { type: Action.Export, action: exportFile, inActionMenu: { present: true, showIcon: true } },
//     { type: Action.ReorderColumns, action: reorderColumns, hasStartSeperator: true, inViewMenu: { present: true } },
//     { type: Action.AddColumn, action: addColumns, disable: true, inViewMenu: { present: true } },
// ]
// const testingActions2: ActionBarElement[] = [
//     { type: Action.Export, action: exportFile },
//     { type: Action.ReorderColumns, action: reorderColumns, hasStartSeperator: true },
//     { type: Action.AddColumn, action: addColumns, disable: true },
//     { type: Action.Misc, title: "Testing element", action: () => { }, icon: "oj-ux-ico-plus", hasStartSeperator: true, inActionMenu: { present: true, showIcon: true } }
// ]



// const getSubmenu = () => {
//     return (
//         <oj-option>
//             {/* <span class={"oj-ux-ico-expand"} slot="startIcon"></span>Select and Add */}
//             Select and Add
//             <oj-menu>
//                 <oj-option>Option1</oj-option>
//                 <oj-option>Option2</oj-option>
//                 <oj-option>Option3</oj-option>
//             </oj-menu>
//         </oj-option>
//     )
// }

// const submenuActionBar: ActionBarElement[] = [
//     { type: Action.Export, action: exportFile, inActionMenu: { present: true, optionTitle: "Export in option" } },
//     { type: Action.ReorderColumns, action: reorderColumns, hasStartSeperator: true },
//     { type: Action.AddColumn, action: addColumns },
//     { type: Action.Misc, action: () => { }, icon: "oj-ux-ico-expand", inActionMenu: { present: true, submenu: getSubmenu, showIcon: false } }
// ]

// return (<div>
//     <h4>Testing Action bar</h4>
//     <ActionBar actions={basicActions} />
//     <ActionBar actions={testActions1} />
//     <ActionBar actions={submenuActionBar} />
// </div>)


