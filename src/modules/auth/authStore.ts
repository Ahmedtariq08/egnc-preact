import { Auth, UserPermissionsStorage, AuthService } from "./authService";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { store } from "../store";
import { AxiosError } from "axios";
import { NavigateTo, router } from "../../routes/Router";



//used for login page and storing user auth data
export default class AuthStore {
    isLoggedIn: boolean = false;
    userPemissions: UserPermissionsStorage | undefined = undefined;
    loginLoader = false;

    constructor() {
        makeAutoObservable(this);
    }

    private setLoggedIn = () => {
        this.isLoggedIn = AuthService.getTokenFromStorage() !== null && !!this.userPemissions;
    }

    //Logs in the user and sets token and permission in local storage.
    loginUser = async (username: string, password: string) => {
        if (!username || !password) {
            store.commonStore.showNotification("error", "Both username and password are required");
        } else {
            this.loginLoader = true;
            try {
                const loginResponse = await Auth.loginUser(username, password);
                const permissions = await Auth.permissions();
                runInAction(() => {
                    AuthService.setTokenInStorage(loginResponse.token);
                    const processedPermissions = AuthService.processPermissions(permissions);
                    AuthService.setPermissionsInStorage(processedPermissions);
                    this.userPemissions = processedPermissions;
                    this.setLoggedIn();
                });
                router.navigate(NavigateTo.Dashboard);
            } catch (error) {
                const message = (error as AxiosError).response?.data;
                store.commonStore.showNotification("error", `${message ?? 'Login failed'}`);
            } finally {
                runInAction(() => {
                    this.loginLoader = false;
                })
            }
        }
    }

    logoutUser = async () => {
        try {
            await Auth.logoutUser();
            AuthService.clearStorage();
            this.userPemissions = undefined;
            this.setLoggedIn();
        } catch (error) {
            console.log(error);
        }
    }
}