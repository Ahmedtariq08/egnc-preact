import { makeAutoObservable } from "mobx";

/**
 * @classdesc This store is used in app layout (header and footer).
 * @example Includes logic related to drawer elements, recents, favourites, signout, resetpassword
 */
export default class LayoutStore {
    isDrawerOpened: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    toggleDrawer = () => {
        this.isDrawerOpened = !this.isDrawerOpened;
    }
}