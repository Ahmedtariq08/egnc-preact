/* eslint-disable react/no-unknown-property */
import { type h } from "preact";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { useState } from "react";
import "ojs/ojswitcher";
import "ojs/ojtoolbar";

export interface Tab {
    slot: string;
    title: string;
    icon: string;
    component: h.JSX.Element;
}

interface Props {
    tabs: Tab[];
    onTabSwitch?: (tab: string) => void;
    vh?: string;
}

export const BlockTabBar = (props: Props) => {
    const { tabs, onTabSwitch, vh = "70" } = props;
    const currentEdge = "start";
    const firstTab =
        Array.isArray(tabs) && tabs.length > 0 ? tabs[0].slot : undefined;
    const [selectedTab, setSelectedTab] = useState(firstTab);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tabChangedHandler = (event: any) => {
        const value = event.detail.value;
        onTabSwitch?.(value);
        setSelectedTab(value);
    };

    const tabElement = () => {
        return (
            <oj-tab-bar
                id="hnavlist"
                class=" oj-bg-neutral-170 oj-color-invert"
                edge={currentEdge}
                selection={selectedTab}
                onselectionChanged={tabChangedHandler}
                data={new ArrayDataProvider(tabs, { keyAttributes: "slot" })}
            >
                <template
                    slot="itemTemplate"
                    render={(tab) => (
                        <ul>
                            <br />
                            <br />
                            <li id={tab.data.slot}>
                                <a href="#">
                                    <span
                                        className={`oj-tabbar-item-icon oj-ux-icon-size-9x ${tab.data.icon}`}
                                        title={tab.data.title}
                                    ></span>
                                </a>
                            </li>
                        </ul>
                    )}
                />
            </oj-tab-bar>
        );
    };

    return (
        <div className="oj-panel oj-sm-margin-2x" style={{ height: `${vh}vh` }}>
            <div
                id="demo-container"
                className="oj-flex demo-edge-start"
                style={{ height: "100%" }}
            >
                {tabElement()}
                <div
                    className="demo-switcher-container"
                    style={{ width: "90%" }}
                >
                    <oj-switcher value={selectedTab}>
                        {tabs.map((tab) => (
                            <div
                                id={tab.slot}
                                slot={tab.slot}
                                role="tabpanel"
                                key={tab.slot}
                            >
                                {tab.component}
                            </div>
                        ))}
                    </oj-switcher>
                </div>
            </div>
        </div>
    );
};
