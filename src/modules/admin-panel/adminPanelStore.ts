import { createContext, useContext } from "react";
import UserStore from "./users/userStore";

interface Store {
    userStore: UserStore
}

export const AdminPanelStore: Store = {
    userStore: new UserStore(),
}

export const AdminPanelStoreContext = createContext(AdminPanelStore);

export const useAdminPanelStore = () => {
    return useContext(AdminPanelStoreContext);
}