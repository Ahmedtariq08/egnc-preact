import { Auth, UserPermissionsStorage, AuthService } from "./authService";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { store } from "../store";
import { AxiosError } from "axios";
import { NavigateTo, router } from "../../routes/Router";

/**
 * @classdesc Used for login page and storing user auth data
 */
export default class AuthStore {
    isLoggedIn: boolean = false;
    userPemissions: UserPermissionsStorage | undefined = undefined;
    loginLoader = false; //login page
    appLoader = false;  //landing page

    constructor() {
        makeAutoObservable(this);
    }

    //Used in main wrapper component whenever a new page loads it populates the store with permissions in local storage
    populateAuth = () => {
        const token = AuthService.getTokenFromStorage();
        const permissions = AuthService.getPermissionsFromStorage();
        if (token === null || permissions === null) {
            this.isLoggedIn = false;
            AuthService.clearStorage();
            router.navigate(NavigateTo.Login);
        } else {
            this.isLoggedIn = true;
            this.userPemissions = permissions;
        }
    }

    //Used on landing page to see if user is already authenticated, then redirect to dashboard
    //If not logged in, then redirect to login page
    checkSignedIn = async () => {
        const token = AuthService.getTokenFromStorage();
        const permissions = AuthService.getPermissionsFromStorage();
        if (token === null || permissions === null) {
            this.isLoggedIn = false;
            AuthService.clearStorage();
            router.navigate(NavigateTo.Login);
        } else {
            this.appLoader = true;
            try {
                await Auth.permissions();
                runInAction(() => {
                    this.isLoggedIn = true;
                    this.userPemissions = permissions;
                });
                router.navigate(NavigateTo.Dashboard);
            } catch (error) {
                runInAction(() => {
                    this.isLoggedIn = false;
                    AuthService.clearStorage();
                });
                router.navigate(NavigateTo.Login);
            } finally {
                runInAction(() => {
                    this.appLoader = false;
                })
            }
        }
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
                    this.isLoggedIn = true;
                });
                store.commonStore.clearNotifications();
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
            this.isLoggedIn = false;
            router.navigate(NavigateTo.Login);
        } catch (error) {
            console.log(error);
        }
    }
}