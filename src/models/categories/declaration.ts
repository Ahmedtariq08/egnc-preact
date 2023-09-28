interface WorkflowState {
    id: number;
    name: string;
}

// Currently using in pending approvals / requests
export interface Declaration {
    id: number;
    declarationType: number;
    supplier: string;
    createdBy: string;
    createdDate: string;
    declarationDescription: string | null;
    workflowStateId: number;
    dueDate: string | null;
    respondByDate: string | null;
    attribute1: string | null;
    attribute2: string | null;
    attribute3: string | null;
    attribute4: string | null;
    attribute5: string | null;
    attribute6: string | null;
    assignee: number | null;
    favourite: boolean;
    nextMovableWorkflowStateType: WorkflowState | null;
    currentMovableWorkflowStateType: WorkflowState | null;
    previousMovableWorkflowStateType: WorkflowState | null;
    declarationState: string | null;
    workflowName: string | null;
    assigneeName: string | null;
}
