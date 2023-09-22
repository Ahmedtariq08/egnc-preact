import { observer } from "mobx-react-lite";
import { BlockTabBar } from "../../components/block-layout/BlockTabBar";
import { Icons } from "../../constants/iconsData";
import { UsersTab } from "./components/UsersTab";
import { AdminPanelStoreContext, AdminPanelStore } from "../../modules/admin-panel/adminPanelStore";
import { SSOTab } from "./components/SsoTab";
import { GeneralConfigurationTab } from "./components/GeneralConfigTab";


export const AdminPanel = observer(() => {
    const tabs = [
        { slot: "users", title: "Users", icon: Icons.icons.users, component: <UsersTab /> },
        { slot: "sso", title: "Single Sign on", icon: Icons.blockIcons.sso, component: <SSOTab /> },
        { slot: "config", title: "Config", icon: Icons.blockIcons.config, component: <GeneralConfigurationTab /> },
    ];

    return (
        <AdminPanelStoreContext.Provider value={AdminPanelStore}>
            <div class='oj-sm-margin-8x-top'>
                <BlockTabBar tabs={tabs} vh="75" />
            </div>
        </AdminPanelStoreContext.Provider>
    )
});
