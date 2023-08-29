import { makeAutoObservable, runInAction } from "mobx";
import { Roles, User, UserApis } from "./userService";

export default class UserStore {
    users: User[] = [];
    roles: Roles[] = [];
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
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