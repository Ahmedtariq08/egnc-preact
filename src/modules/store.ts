import { injectStores } from "@mobx-devtools/tools";
import { createContext, useContext } from "react";
import LayoutStore from "./app-layout/layoutStore";
import AuthStore from "./auth/authStore";
import CommonStore from "./commonStore";

interface Store {
    commonStore: CommonStore
    authStore: AuthStore
    layoutStore: LayoutStore
}

export const store: Store = {
    commonStore: new CommonStore(),
    authStore: new AuthStore(),
    layoutStore: new LayoutStore()
}

injectStores({
    commonStore: new CommonStore(),
    authStore: new AuthStore(),
    layoutStore: new LayoutStore()
});

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext(StoreContext);
}