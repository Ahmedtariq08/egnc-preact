/* eslint-disable react/no-unknown-property */
import { observer } from "mobx-react-lite";
import "ojs/ojnavigationlist";
import { useStore } from "../../modules/store";
import { type Pages, navigateToPath } from "../../routes/redirection";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

export const Drawer = observer(() => {
    const {
        dashboardStore: { conveyorBeltCards },
        layoutStore: { toggleDrawer },
    } = useStore();
    const data = new MutableArrayDataProvider(conveyorBeltCards, {
        keyAttributes: "label",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const redirection = (event: any, link: Pages) => {
        event.preventDefault();
        toggleDrawer();
        navigateToPath(link);
    };

    return (
        <div
            slot="start"
            className="drawer-start oj-sm-margin demo-drawer oj-bg-neutral-170 oj-color-invert"
        >
            <oj-navigation-list display="all" drillMode="none" data={data}>
                <template
                    slot="itemTemplate"
                    render={(item) => (
                        <li
                            onClick={(e) => {
                                redirection(e, item.data.link);
                            }}
                        >
                            <a href="#">
                                <span
                                    className={`oj-navigationlist-item-icon ${item.data.icon}`}
                                ></span>
                                {item.data.label}
                            </a>
                        </li>
                    )}
                />
            </oj-navigation-list>
        </div>
    );
});
