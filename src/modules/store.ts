import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import AuthStore from "./auth/authStore";


interface Store {
    commonStore: CommonStore
    authStore: AuthStore
}

export const store: Store = {
    commonStore: new CommonStore(),
    authStore: new AuthStore()
}

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext(StoreContext);
}