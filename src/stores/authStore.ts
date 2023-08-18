import { makeAutoObservable, runInAction } from "mobx";

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
        this.loginLoader = true;
        try {

        } catch (error) {
            console.log(error) //handle error better
        } finally {
            runInAction(() => {
                this.loginLoader = false;
            })
        }
    }
}