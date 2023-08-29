import { makeAutoObservable, runInAction } from "mobx";
import { Roles, User, UserApis } from "./userService";
import { ColumnsMetaData } from "../../../common/add-remove/AddRemoveColumns";
import { Column, tableColumnsData } from "../../../constants/tableColumns";

export default class UserStore {
    users: User[] = [];
    roles: Roles[] = [];
    popupHooks = { addRemove: false, reorder: false, confirmation: false }
    columns: ColumnsMetaData = { addedColumns: tableColumnsData.ADMIN_PANEL.USERS, columnsToBeAdded: [], }
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    openPopup = (hook: keyof typeof this.popupHooks) => {
        this.popupHooks = { ...this.popupHooks, [hook]: true }
    }
    closePopup = (hook: keyof typeof this.popupHooks) => {
        this.popupHooks = { ...this.popupHooks, [hook]: false }
    }

    reorderColumns = (reorderedColumns: Column[]) => {
        this.columns.addedColumns = reorderedColumns;
    }

    addRemoveColumns = (columns: ColumnsMetaData) => {
        this.columns = columns;
    }

    loadUserData = async () => {
        this.isLoading = true;
        try {
            const [users, roles] = await Promise.all([UserApis.getAllUsers(), UserApis.getRoles()]);
            runInAction(() => {
                this.users = users;
                this.roles = roles;
            })
        } catch (error) {
            console.error(error);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            })
        }
    }


}