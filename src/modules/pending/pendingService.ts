import { requests, URLs } from "../../api";
import { Constants } from "../../constants/constants";
import { type Column } from "../../constants/tableColumns";
import { type Declaration } from "../../models/categories/declaration";
import { getPermissionsFromStorage } from "../auth/authService";

// ANCHOR - APIs
const { DECLARATION } = URLs.MAIN;
const { OPEN_TO_MANAGER, OPEN_TO_SUPPLIER } = Constants.WORKFLOWSTATES;

export const PendingApis = {
    getPendingRequests: async () =>
        await requests.get<Declaration[]>(`${DECLARATION}/`, { params: { state: OPEN_TO_SUPPLIER } }),
    getPendingApprovals: async () =>
        await requests.get<Declaration[]>(`${DECLARATION}/`, { params: { state: OPEN_TO_MANAGER } }),
    withdrawRequest: async (declarationId: string | number) =>
        await requests.put(`${DECLARATION}/${declarationId}/state`, {
            action: "prev",
            comments: "",
            lastModifiedBy: getPermissionsFromStorage()?.username,
        }),
};

// ANCHOR - Table Constants
export const PendingTemplates = {
    requestId: "id",
    declarationType: "declaration_type",
    description: "description",
    supplier: "supplier",
    createdBy: "createdBy",
    createdDate: "createdDate",
    dueDate: "dueDate",
};

const { requestId, declarationType, description, supplier, createdBy, createdDate, dueDate } =
    PendingTemplates;
export const PendingColumns: Column[] = [
    { headerText: "Request ID", Id: requestId, field: requestId, resizable: "enabled", template: requestId },
    {
        headerText: "Declaration Type",
        Id: declarationType,
        field: declarationType,
        resizable: "enabled",
        template: declarationType,
    },
    {
        headerText: "Description",
        Id: description,
        resizable: "enabled",
        field: description,
        template: description,
    },
    { headerText: "Supplier", Id: supplier, resizable: "enabled", field: supplier, template: supplier },
    { headerText: "Created By", Id: createdBy, resizable: "enabled", field: createdBy, template: createdBy },
    {
        headerText: "Created Date",
        Id: createdDate,
        resizable: "enabled",
        field: createdDate,
        template: createdDate,
    },
    { headerText: "Due Date", Id: dueDate, resizable: "enabled", field: dueDate, template: dueDate },
];
