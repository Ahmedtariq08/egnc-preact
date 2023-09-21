import { createContext, useContext } from "react";
import UserStore from "./users/userStore";
import SsoStore from "./sso/ssoStore";

interface Store {
    userStore: UserStore,
    ssoStore: SsoStore
}

export const AdminPanelStore: Store = {
    userStore: new UserStore(),
    ssoStore: new SsoStore
}

export const AdminPanelStoreContext = createContext(AdminPanelStore);

export const useAdminPanelStore = () => {
    return useContext(AdminPanelStoreContext);
}