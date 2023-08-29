import { observer } from "mobx-react-lite";
import { BlockTabBar } from "../../components/block-layout/BlockTabBar";
import { Icons } from "../../constants/iconsData";
import { UsersTab } from "./components/UsersTab";
import { AdminPanelStoreContext, AdminPanelStore } from "../../modules/admin-panel/adminPanelStore";


export const AdminPanel = observer(() => {
    const tabs = [
        { slot: "users", title: "Users", icon: Icons.icons.users, component: <UsersTab /> },
        { slot: "sso", title: "Single Sign on", icon: Icons.blockIcons.sso, component: <SSO /> },
        { slot: "config", title: "Config", icon: Icons.blockIcons.config, component: <GeneralConfig /> },
    ];

    return (
        <AdminPanelStoreContext.Provider value={AdminPanelStore}>
            <div class='oj-sm-margin-8x-top'>
                <BlockTabBar tabs={tabs} />
            </div>
        </AdminPanelStoreContext.Provider>
    )
});

const Users = () => {
    return <h5>Users</h5>
}

const SSO = () => {
    return <h5>SSO</h5>
}
const GeneralConfig = () => {
    return <h5>General Configurations</h5>
}