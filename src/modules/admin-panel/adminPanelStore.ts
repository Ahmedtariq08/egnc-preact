import { createContext, useContext } from "react";
import UserStore from "./users/userStore";
import SsoStore from "./sso/ssoStore";
import GeneralConfigStore from "./general-config/generalConfigStore";

interface Store {
    userStore: UserStore,
    ssoStore: SsoStore,
    generalConfigStore: GeneralConfigStore
}

export const AdminPanelStore: Store = {
    userStore: new UserStore(),
    ssoStore: new SsoStore,
    generalConfigStore: new GeneralConfigStore()
}

export const AdminPanelStoreContext = createContext(AdminPanelStore);

export const useAdminPanelStore = () => {
    return useContext(AdminPanelStoreContext);
}