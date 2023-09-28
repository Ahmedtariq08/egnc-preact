import { makeAutoObservable, runInAction } from "mobx";
import { type ColumnsMetaData } from "../../common/add-remove/AddRemoveColumns";
import { type Column } from "../../constants/tableColumns";
import { type Declaration } from "../../models/categories/declaration";
import { dateFormatter } from "../../utils/dateUtils";
import { store } from "../store";
import { PendingApis, PendingColumns } from "./pendingService";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

export default class PendingStore {
    loadingData = false;
    pendingDeclarations: Declaration[] = [];
    dataProvider = new MutableArrayDataProvider<string, Declaration>(this.pendingDeclarations, {
        keyAttributes: "id",
    });

    columns: ColumnsMetaData = { addedColumns: PendingColumns, columnsToBeAdded: [] };

    constructor() {
        makeAutoObservable(this);
    }

    loadPendingData = async (isApprovals: boolean) => {
        this.loadingData = true;
        try {
            const response = isApprovals
                ? await PendingApis.getPendingApprovals()
                : await PendingApis.getPendingRequests();
            const declarations = response.map((declaration) => {
                return {
                    ...declaration,
                    createdDate: dateFormatter(declaration.createdDate),
                    dueDate: dateFormatter(declaration.dueDate),
                };
            }) as Declaration[];
            runInAction(() => {
                this.updateDeclarationsData(declarations);
            });
        } catch (error) {
            store.commonStore.showNotification(
                "error",
                `Failed to fetch pending ${isApprovals ? "approvals" : "requests"}.`,
            );
        } finally {
            this.loadingData = false;
        }
    };

    withdrawRequest = async (declarationId: string | number) => {
        try {
            await PendingApis.withdrawRequest(declarationId);
            const declarations = this.pendingDeclarations.filter((dec) => dec.id !== declarationId);
            this.updateDeclarationsData(declarations);
            store.commonStore.showNotification("confirmation", "Withdrawl request made successfully");
        } catch (error) {
            store.commonStore.showNotification("error", "Withdraw request failed.");
        }
    };

    private readonly updateDeclarationsData = (declarations: Declaration[]) => {
        this.pendingDeclarations = declarations;
        this.dataProvider.data = declarations;
    };

    reorderColumns = (reorderedColumns: Column[]) => {
        this.columns.addedColumns = reorderedColumns;
    };

    addRemoveColumns = (columns: ColumnsMetaData) => {
        this.columns = columns;
    };
}
