import { APIs } from "../api/endpoints";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { AxiosError } from "axios";



//used for login page and storing user auth data
export default class AuthStore {
    token: string | undefined = undefined;
    username: string | undefined = undefined;
    loginLoader = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.token;
    }

    loginUser = async (username: string, password: string) => {
        if (!username || !password) {
            store.commonStore.showNotification("error", "Both username and password are required");
        } else {
            this.loginLoader = true;
            try {
                const response = await APIs.AUTH.loginUser(username, password);
                const token = response.token
                runInAction(() => {
                    this.token = token;
                })
                store.commonStore.showNotification("confirmation", `Login success: ${token}`);
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
}