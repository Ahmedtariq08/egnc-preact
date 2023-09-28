import { createContext, useContext } from "react";
import UserStore from "./users/userStore";
import SsoStore from "./sso/ssoStore";
import GeneralConfigStore from "./general-config/generalConfigStore";
import AttributeMappingStore from "./attribute-mapping/attributeMappingStore";

interface Store {
    userStore: UserStore;
    ssoStore: SsoStore;
    generalConfigStore: GeneralConfigStore;
    attributeMappingStore: AttributeMappingStore;
}

export const AdminPanelStore: Store = {
    userStore: new UserStore(),
    ssoStore: new SsoStore(),
    generalConfigStore: new GeneralConfigStore(),
    attributeMappingStore: new AttributeMappingStore(),
};

export const AdminPanelStoreContext = createContext(AdminPanelStore);

export const useAdminPanelStore = () => {
    return useContext(AdminPanelStoreContext);
};
