import { requests } from "../../api/apiClient";
import { Constants } from "../../constants/constants";
import { Column } from "../../constants/tableColumns";
import { Declaration } from "../../models/categories/declaration";

//ANCHOR - APIs
export const PendingApis = {
    getPendingRequests:
        () => requests.get<Declaration[]>(`MainService/declaration/?state=${Constants.WORKFLOWSTATES.OPEN_TO_SUPPLIER}`),
    getPendingApprovals:
        () => requests.get<Declaration[]>(`MainService/declaration/?state=${Constants.WORKFLOWSTATES.OPEN_TO_MANAGER}`),
}

//ANCHOR - Table Constants
export const PendingTemplates = {
    requestId: 'id',
    declarationType: 'declaration_type',
    description: 'description',
    supplier: 'supplier',
    createdBy: 'createdBy',
    createdDate: 'createdDate',
    dueDate: 'dueDate'
}

const { requestId, declarationType, description, supplier, createdBy, createdDate, dueDate } = PendingTemplates;
export const PendingColumns: Column[] = [
    { headerText: "Request ID", Id: requestId, field: requestId, resizable: "enabled", template: requestId },
    { headerText: "Declaration Type", Id: declarationType, field: declarationType, resizable: "enabled", template: declarationType },
    { headerText: "Description", Id: description, resizable: "enabled", field: description, template: description },
    { headerText: "Supplier", Id: supplier, resizable: "enabled", field: supplier, template: supplier },
    { headerText: "Created By", Id: createdBy, resizable: "enabled", field: createdBy, template: createdBy },
    { headerText: "Created Date", Id: createdDate, resizable: "enabled", field: createdDate, template: createdDate },
    { headerText: "Due Date", Id: dueDate, resizable: "enabled", field: dueDate, template: dueDate }
]