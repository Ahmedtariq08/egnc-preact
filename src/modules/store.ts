import { injectStores } from "@mobx-devtools/tools";
import { createContext, useContext } from "react";
import LayoutStore from "./app-layout/layoutStore";
import AuthStore from "./auth/authStore";
import CommonStore from "./commonStore";
import DashboardStore from "./dashboard/dashboardStore";
import PendingStore from "./pending/pendingStore";
import ReportStore from "./reports/reportsStore";

interface Store {
    commonStore: CommonStore;
    authStore: AuthStore;
    layoutStore: LayoutStore;
    dashboardStore: DashboardStore;
    pendingStore: PendingStore;
    reportStore: ReportStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    authStore: new AuthStore(),
    layoutStore: new LayoutStore(),
    dashboardStore: new DashboardStore(),
    pendingStore: new PendingStore(),
    reportStore: new ReportStore(),
};

injectStores({
    commonStore: new CommonStore(),
    authStore: new AuthStore(),
    layoutStore: new LayoutStore(),
});

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext(StoreContext);
};
