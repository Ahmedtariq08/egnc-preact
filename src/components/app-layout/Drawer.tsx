import { observer } from "mobx-react-lite";
import "ojs/ojnavigationlist";
import { useStore } from "../../modules/store";
import { Paths, navigateToPath } from "../../routes/redirection";
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

export const Drawer = observer(() => {
    const { dashboardStore: { conveyorBeltCards }, layoutStore: { toggleDrawer } } = useStore();
    const data = new MutableArrayDataProvider(conveyorBeltCards, { keyAttributes: 'label' });

    const redirection = (event: any, link: Paths) => {
        event.preventDefault();
        toggleDrawer();
        navigateToPath(link as any);
    }

    return (
        <div slot="start" class="drawer-start oj-sm-margin demo-drawer oj-bg-neutral-170 oj-color-invert">
            <oj-navigation-list
                display="all"
                drillMode="none"
                data={data}>
                <template slot="itemTemplate" render={(item) =>
                    <li onClick={(e) => redirection(e, item.data.link)}>
                        <a href="#">
                            <span class={`oj-navigationlist-item-icon ${item.data.icon}`}></span>
                            {item.data.label}
                        </a>
                    </li>
                } />
            </oj-navigation-list>
        </div>
    )
})