import { h } from 'preact';
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { useState } from 'react';
import "ojs/ojswitcher";
import "ojs/ojtoolbar";

export interface Tab {
    slot: string,
    title: string,
    icon: string,
    component: h.JSX.Element,
}

interface Props {
    tabs: Tab[],
    onTabSwitch?: (tab: string) => void,
    vh?: string
}

export const BlockTabBar = (props: Props) => {
    const { tabs, onTabSwitch, vh = '70' } = props;
    const currentEdge = "start";
    const firstTab = (Array.isArray(tabs) && tabs.length > 0) ? tabs[0].slot : undefined;
    const [selectedTab, setSelectedTab] = useState(firstTab);

    const tabChangedHandler = (event: any) => {
        let value = event.detail.value;
        onTabSwitch?.(value);
        setSelectedTab(value);
    }

    const tabElement = () => {
        return (
            <oj-tab-bar
                id="hnavlist"
                class=" oj-bg-neutral-170 oj-color-invert"
                edge={currentEdge} selection={selectedTab}
                onselectionChanged={tabChangedHandler}
                data={new ArrayDataProvider(tabs, { keyAttributes: "slot" })}>
                <template slot="itemTemplate" render={(tab) =>
                    <ul>
                        <br /><br />
                        <li id={tab.data.slot}>
                            <a href="#">
                                <span class={`oj-tabbar-item-icon oj-ux-icon-size-9x ${tab.data.icon}`}
                                    title={tab.data.title}></span>
                            </a>
                        </li>
                    </ul>
                } />
            </oj-tab-bar>
        )
    }

    return (
        <div class="oj-panel oj-sm-margin-2x" style={{ height: `${vh}vh` }}>
            <div id="demo-container" class="oj-flex demo-edge-start" style={{ height: '100%' }}>
                {tabElement()}
                <div class="demo-switcher-container" style={{ width: '90%' }}>
                    <oj-switcher value={selectedTab}>
                        {tabs.map(tab => (
                            <div id={tab.slot} slot={tab.slot} role="tabpanel">
                                {tab.component}
                            </div>
                        ))}
                    </oj-switcher>
                </div>
            </div>
        </div>
    )
}