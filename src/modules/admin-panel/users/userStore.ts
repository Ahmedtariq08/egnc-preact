import { makeAutoObservable, runInAction } from "mobx";
import { NewUser, Roles, User, UserApis, UserService } from "./userService";
import { ColumnsMetaData } from "../../../common/add-remove/AddRemoveColumns";
import { Column, tableColumnsData } from "../../../constants/tableColumns";
import { store } from "../../../modules/store";
import { sortDataWithDates } from "../../../utils/dateUtils";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ListDataProviderView = require("ojs/ojlistdataproviderview");
import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
import Message = require("ojs/ojmessaging")
import { FilterFactory } from "ojs/ojdataprovider";

type CreateUpdate = "Create" | "Update"
type RequiredValidatorMessages = { username?: Message[], email?: Message[], phone?: Message[], roles?: Message[] }

const CONSTANTS = {
    KEYATTR_USERS: 'id',
    SORT_KEY1: 'lastModifiedDate',
    SORT_KEY2: 'createdDate',
    CREATE: "Create",
    UPDATE: "Update",
    INLINE_CLASS: "oj-label oj-label-inline",
    VALIDATORS: [new AsyncRegExpValidator({
        pattern: "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
        hint: "Enter a valid email format",
        messageDetail: "Not a valid email format",
    }),],
    MESSAGES: {
        FIELD_NOT_EMPTY: "This field cannot be empty.",
        USERNAME_TAKEN: "This username has already been taken.",
        ONLY_UNDERSCORE: "Invalid username, you can only use underscore.",
        EMAIL_INUSE: "Email address is already in use.",
        MUST_SELECT: "You must select a value for this field.",
        ONLY_NUMBER: "Only numbers are allowed."
    }
}

export default class UserStore {
    isLoading = false;
    users: User[] = [];
    selectedUser: User | undefined = undefined;
    filter: string | undefined = undefined;
    popupHooks = { addRemove: false, reorder: false, resetPassword: false, createUpdate: false }
    columns: ColumnsMetaData = { addedColumns: tableColumnsData.ADMIN_PANEL.USERS, columnsToBeAdded: [], }

    //Create / Update
    mode: CreateUpdate = "Create";
    roles: Roles[] = [];
    requiredMessageArray: RequiredValidatorMessages = {};
    popupUser: NewUser = UserService.getNewUser();

    constructor() {
        makeAutoObservable(this);
    }

    openPopup = (hook: keyof typeof this.popupHooks) => {
        this.popupHooks = { ...this.popupHooks, [hook]: true }
    }
    openCreateUpdatePopup = (mode: CreateUpdate) => {
        this.mode = mode;
        if (mode === "Update") {
            this.popupUser = UserService.copyUserFields(this.selectedUser!);
        }
        this.popupHooks = { ...this.popupHooks, createUpdate: true }
    }
    closePopup = (hook: keyof typeof this.popupHooks) => {
        this.popupUser = UserService.getNewUser();
        this.popupHooks = { ...this.popupHooks, [hook]: false }
    }
    closeCreateUpdatePopup = () => {
        this.requiredMessageArray = {};
        this.popupHooks = { ...this.popupHooks, createUpdate: false }
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

    setFilter = (value: string) => {
        this.filter = value;
    }

    get usersDp() {
        const copyUsers = UserService.mapRolesToName(this.users.slice());
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

    //ANCHOR - Create / Update
    get rolesDp() {
        const mappedRoles = this.roles.map((role) => { return { label: role.name, value: role.name } });
        return new ArrayDataProvider(mappedRoles, { keyAttributes: 'value' });
    }

    get modeIsUpdate() {
        return this.mode === "Update";
    }

    valueChangeHandler = (event: any, key: keyof typeof this.popupUser) => {
        let value = event.detail.value;
        this.popupUser = { ...this.popupUser, [key]: value };
    }

    private validationChecksPassed = (): boolean => {
        const { username, email, roles, phone } = this.popupUser;

        this.requiredMessageArray = {};

        const usernameErrors = username.length < 1 ? [this.errorMessage(CONSTANTS.MESSAGES.FIELD_NOT_EMPTY)] :
            username.split(" ").length > 1 ? [this.errorMessage(CONSTANTS.MESSAGES.ONLY_UNDERSCORE)] :
                (!this.modeIsUpdate ? this.users.find(user => user.username === username) ? [this.errorMessage(CONSTANTS.MESSAGES.USERNAME_TAKEN)] : [] : []);

        const emailErrors = !email ? [this.errorMessage(CONSTANTS.MESSAGES.FIELD_NOT_EMPTY)] :
            (!this.modeIsUpdate ? this.users.find(user => user.email === email) ? [this.errorMessage(CONSTANTS.MESSAGES.EMAIL_INUSE)] : [] : []);

        const rolesError = !roles || roles.length < 1 ? [this.errorMessage(CONSTANTS.MESSAGES.MUST_SELECT)] : [];
        const validatorMessages: RequiredValidatorMessages = { username: usernameErrors, email: emailErrors, roles: rolesError };
        this.requiredMessageArray = validatorMessages;

        return !Object.values(validatorMessages).flat().some(value => value);
    };

    private errorMessage = (text: string) => { return new Message("summary", text, "error"); }

    createOrUpdateUser = async () => {
        if (this.validationChecksPassed()) {
            this.closeCreateUpdatePopup();
            try {
                const user = this.modeIsUpdate ? await UserApis.updateUser(this.popupUser) : await UserApis.createUser(this.popupUser);
                const filteredUsers = this.users.filter(u => u.id != user.id);
                this.users = [user, ...filteredUsers];
                store.commonStore.showNotification("confirmation", `User ${this.modeIsUpdate ? 'updated' : 'created'} successfully.`);
            } catch (error) {
                store.commonStore.showNotification("error", `Error in ${this.modeIsUpdate ? 'updating' : 'creating'} user.`);
            }
        }
    }

}