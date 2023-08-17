import { DefaultIcons } from "../[constants]/Icons"

export const CONSTANTS = {
    ICON: DefaultIcons.addColumns,
    MODAL_ID_COLUMNS: "addRemoveColumnModal",
    MODAL_ID_FIELD: "addFieldModal",
    MODAL_TITLE_COLUMNS: "Add Columns",
    MODAL_TITLE_FIELDS: "Add Fields"
}
export const TABLE = {
    ID1: "availableAttributesTable",
    TITLE1: "Available Attributes",
    ID2: "selectedAttributesTable",
    TITLE2: "Selected Attributes",
    SELECTION: { column: "none" as "none", row: "multiple" as "multiple" },
    COLUMNS_HEADERS: [{ "headerText": "Column", "field": "headerText" }],
    COLUMNS_DEFAULT: { sortable: "disabled" as "disabled" },
    ROW_DATATYPE: '["application/ojtablerows+json"]',
    ROW_IDENTIFIER: 'Id',  //Do not Change
    CLASS: "oj-bg-body demo-table-container",
    STYLE: "width: 100%; height: 200px;"
}
export const TEXT = {
    COMPONENT_COLUMNS: "Add Columns",
    COMPONENT_FIELDS: "Add Fields",
    DND: "** Drag and Drop to add fields",
    LABEL: "oj-label oj-text-color-success",
    BUTTON: {
        ADD: "Add",
        REMOVE: "Remove",
        OK: "OK",
        CANCEL: "Cancel"
    }
}
export const SLOTS = {
    BODY: "body",
    ICON: "startIcon",
    FOOTER: "footer"
}