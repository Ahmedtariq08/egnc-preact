import { injectStores } from "@mobx-devtools/tools";
import { createContext, useContext } from "react";
import LayoutStore from "./app-layout/layoutStore";
import AuthStore from "./auth/authStore";
import CommonStore from "./commonStore";
import DashboardStore from "./dashboard/dashboardStore";
import PendingStore from "./pending/pendingStore";

interface Store {
    commonStore: CommonStore
    authStore: AuthStore
    layoutStore: LayoutStore
    dashboardStore: DashboardStore
    pendingStore: PendingStore
}

export const store: Store = {
    commonStore: new CommonStore(),
    authStore: new AuthStore(),
    layoutStore: new LayoutStore(),
    dashboardStore: new DashboardStore(),
    pendingStore: new PendingStore()
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