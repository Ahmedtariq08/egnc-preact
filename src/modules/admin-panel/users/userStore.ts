import { makeAutoObservable, runInAction } from "mobx";
import { Roles, User, UserApis, UserService } from "./userService";
import { ColumnsMetaData } from "../../../common/add-remove/AddRemoveColumns";
import { Column, tableColumnsData } from "../../../constants/tableColumns";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ListDataProviderView = require("ojs/ojlistdataproviderview");

export default class UserStore {
    isLoading = false;
    users: User[] = [];
    selectedUser: User | undefined = undefined;
    roles: Roles[] = [];
    popupHooks = { addRemove: false, reorder: false, confirmation: false }
    columns: ColumnsMetaData = { addedColumns: tableColumnsData.ADMIN_PANEL.USERS, columnsToBeAdded: [], }


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
                this.users = UserService.mapRolesToName(users);
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

    get isRowSelected() {
        return !!this.selectedUser;
    }

    rowChangedHandler = (event: any) => {
        if (event.detail && event.detail.value) {
            let data = event.detail.value.data;
            this.selectedUser = data;
        }
    }


}