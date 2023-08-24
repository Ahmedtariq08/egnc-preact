import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Declaration } from "../../models/categories/declaration";
import { store } from "../store";
import { PendingApis, PendingColumns } from "./pendingService";
import { Column } from "../../constants/tableColumns";
import { ColumnsMetaData } from "../../common/add-remove/AddRemoveColumns";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

export default class PendingStore {
    loadingData = false;
    pendingDeclarations: Declaration[] = [];
    dataProvider: MutableArrayDataProvider<string, Declaration> = new MutableArrayDataProvider(this.pendingDeclarations, { keyAttributes: "id" });
    columns: ColumnsMetaData = { addedColumns: PendingColumns, columnsToBeAdded: [], }

    constructor() {
        makeAutoObservable(this);
    }

    loadPendingData = async (isApprovals: boolean) => {
        this.loadingData = true;
        try {
            const data = isApprovals ? await PendingApis.getPendingApprovals() : await PendingApis.getPendingRequests();
            runInAction(() => {
                this.updateDeclarationsData(data);
            })
        } catch (error) {
            store.commonStore.showNotification("error", `Failed to fetch pending ${isApprovals ? 'approvals' : 'requests'}.`);
        } finally {
            this.loadingData = false;
        }
    }

    private updateDeclarationsData = (declarations: Declaration[]) => {
        this.pendingDeclarations = declarations;
        this.dataProvider.data = declarations;
    }

    reorderColumns = (reorderedColumns: Column[]) => {
        this.columns.addedColumns = reorderedColumns;
    }

    addRemoveColumns = (columns: ColumnsMetaData) => {
        this.columns = columns;
    }

}