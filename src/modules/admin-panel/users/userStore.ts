import { makeAutoObservable, runInAction } from "mobx";
import { Roles, User, UserApis, UserService } from "./userService";
import { ColumnsMetaData } from "../../../common/add-remove/AddRemoveColumns";
import { Column, tableColumnsData } from "../../../constants/tableColumns";
import { store } from "../../../modules/store";
import { sortDataWithDates } from "../../../utils/dateUtils";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ListDataProviderView = require("ojs/ojlistdataproviderview");
import { FilterFactory } from "ojs/ojdataprovider";

const CONSTANTS = {
    KEYATTR_USERS: 'id',
    SORT_KEY1: 'lastModifiedDate',
    SORT_KEY2: 'createdDate',
}

export default class UserStore {
    isLoading = false;
    users: User[] = [];
    selectedUser: User | undefined = undefined;
    filter: string | undefined = undefined;
    roles: Roles[] = [];
    popupHooks = { addRemove: false, reorder: false, resetPassword: false }
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

    setFilter = (value: string) => {
        this.filter = value;
    }

    get usersDp() {
        const copyUsers = this.users.slice();
        sortDataWithDates(copyUsers, CONSTANTS.SORT_KEY1, CONSTANTS.SORT_KEY2);
        let filterCriterion = (this.filter) ? FilterFactory.getFilter({ filterDef: { text: this.filter } }) : undefined;
        const arrayDataProvider = new ArrayDataProvider(copyUsers, { keyAttributes: CONSTANTS.KEYATTR_USERS });
        return new ListDataProviderView(arrayDataProvider, { filterCriterion: filterCriterion });
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

    resetPassword = async () => {
        try {
            if (this.selectedUser) {
                const userId = this.selectedUser.id.toLocaleString();
                await UserApis.resetPassword(userId);
                store.commonStore.showNotification("confirmation", "Password reset email sent successfully.");
            }
        } catch (error) {
            store.commonStore.showNotification("error", "Request for reset password failed.");
        }
    }


}