import { type AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { Pages, navigateToPath } from "../../routes/redirection";
import { store } from "../store";
import {
    Auth,
    clearStorage,
    getPermissionsFromStorage,
    getTokenFromStorage,
    processPermissions,
    setPermissionsInStorage,
    setTokenInStorage,
    type UserPermissionsStorage,
} from "./authService";

/**
 * @classdesc Used for login page and storing user auth data
 */
export default class AuthStore {
    isLoggedIn: boolean = false;
    userPemissions: UserPermissionsStorage | undefined = undefined;
    loginLoader = false; // login page
    appLoader = false; // landing page

    constructor() {
        makeAutoObservable(this);
    }

    // Used in main wrapper component whenever a new page loads it populates
    // the store with permissions in local storage
    populateAuth = () => {
        const token = getTokenFromStorage();
        const permissions = getPermissionsFromStorage();
        if (token === null || permissions === null) {
            this.isLoggedIn = false;
            clearStorage();
            void navigateToPath(Pages.Login);
        } else {
            this.isLoggedIn = true;
            this.userPemissions = permissions;
        }
    };

    // Used on landing page to see if user is already authenticated, then redirect to dashboard
    // If not logged in, then redirect to login page
    checkSignedIn = async () => {
        const token = getTokenFromStorage();
        const permissions = getPermissionsFromStorage();
        if (token === null || permissions === null) {
            this.isLoggedIn = false;
            clearStorage();
            void navigateToPath(Pages.Login);
        } else {
            this.appLoader = true;
            try {
                await Auth.permissions();
                runInAction(() => {
                    this.isLoggedIn = true;
                    this.userPemissions = permissions;
                });
                void navigateToPath(Pages.Dashboard);
            } catch (error) {
                runInAction(() => {
                    this.isLoggedIn = false;
                    clearStorage();
                });
                void navigateToPath(Pages.Login);
            } finally {
                runInAction(() => {
                    this.appLoader = false;
                });
            }
        }
    };

    // Logs in the user and sets token and permission in local storage.
    loginUser = async (username: string, password: string) => {
        if (!username || !password) {
            store.commonStore.showNotification("error", "Both username and password are required");
        } else {
            this.loginLoader = true;
            try {
                const loginResponse = await Auth.loginUser(username, password);
                const permissions = await Auth.permissions();
                runInAction(() => {
                    setTokenInStorage(loginResponse.token);
                    const processedPermissions = processPermissions(permissions);
                    setPermissionsInStorage(processedPermissions);
                    this.userPemissions = processedPermissions;
                    this.isLoggedIn = true;
                });
                store.commonStore.clearNotifications();
                void navigateToPath(Pages.Dashboard);
            } catch (error) {
                const message = (error as AxiosError).response?.data;
                store.commonStore.showNotification(
                    "error",
                    `${message ? (message as string) : "Login failed"}`,
                );
            } finally {
                runInAction(() => {
                    this.loginLoader = false;
                });
            }
        }
    };

    logoutUser = async () => {
        try {
            await Auth.logoutUser();
            clearStorage();
            this.userPemissions = undefined;
            this.isLoggedIn = false;
            void navigateToPath(Pages.Login);
        } catch (error) {
            console.log(error);
        }
    };
}
