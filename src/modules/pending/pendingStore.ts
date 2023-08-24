import { makeAutoObservable, runInAction } from "mobx";
import { Declaration } from "../../models/categories/declaration";
import { store } from "../store";
import { PendingApis, PendingColumns } from "./pendingService";
import { Column } from "../../constants/tableColumns";
import { ColumnsMetaData } from "../../common/add-remove/AddRemoveColumns";

export default class PendingStore {
    loadingData = false;
    pendingDeclarations: Declaration[] = [];
    columns: ColumnsMetaData = { addedColumns: PendingColumns, columnsToBeAdded: [], }

    constructor() {
        makeAutoObservable(this);
    }

    loadPendingData = async (isApprovals: boolean) => {
        this.loadingData = true;
        try {
            const data = isApprovals ? await PendingApis.getPendingApprovals() : await PendingApis.getPendingRequests();
            runInAction(() => {
                this.pendingDeclarations = data;
            })
        } catch (error) {
            store.commonStore.showNotification("error", `Failed to fetch pending ${isApprovals ? 'approvals' : 'requests'}.`);
        } finally {
            this.loadingData = false;
        }
    }

    reorderColumns = (reorderedColumns: Column[]) => {
        this.columns.addedColumns = reorderedColumns;
    }

    addRemoveColumns = (columns: ColumnsMetaData) => {
        this.columns = columns;
    }

}