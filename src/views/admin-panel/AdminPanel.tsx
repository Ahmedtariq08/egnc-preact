import { observer } from "mobx-react-lite";
import { BlockTabBar, type Tab } from "../../components/block-layout/BlockTabBar";
import { Icons } from "../../constants/iconsData";
import { UsersTab } from "./components/users/UsersTab";
import { AdminPanelStoreContext, AdminPanelStore } from "../../modules/admin-panel/adminPanelStore";
import { SSOTab } from "./components/SsoTab";
import { GeneralConfigurationTab } from "./components/GeneralConfigTab";
import { AttributeMappingTab } from "./components/attribute-mapping/AttributeMapping";

const { attributes, sso, config } = Icons.blockIcons;

const tabs: Tab[] = [
    { slot: "users", title: "Users", icon: Icons.icons.users, component: <UsersTab /> },
    {
        slot: "attributeMapping",
        title: "Attribute Mapping",
        icon: attributes,
        component: <AttributeMappingTab />,
    },
    { slot: "sso", title: "Single Sign on", icon: sso, component: <SSOTab /> },
    { slot: "config", title: "Config", icon: config, component: <GeneralConfigurationTab /> },
];

export const AdminPanel = observer(() => {
    return (
        <AdminPanelStoreContext.Provider value={AdminPanelStore}>
            <div className="oj-sm-margin-8x-top">
                <BlockTabBar tabs={tabs} vh="75" />
            </div>
        </AdminPanelStoreContext.Provider>
    );
});
