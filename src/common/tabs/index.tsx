import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojswitcher";
type Props = {
    tabs: string[];  //pass array of Slots
    children: h.JSX.Element | h.JSX.Element[];
    TAB_META: any
}

export const Tabs = (props: Props) => {
    const { tabs, children, TAB_META } = props;
    const currentEdge = "start";
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    const tabChangedHandler = (event: any) => {
        let value = event.detail.value;
        setSelectedTab(value);
    }

    const tabsToShow: any = [];
    tabs.forEach(slot => {
        if (TAB_META.has(slot)) { tabsToShow.push(TAB_META.get(slot)); }
    });

    const tabElement = () => {
        return (
            <oj-tab-bar id="hnavlist" class=" oj-bg-neutral-170 oj-color-invert" style={{height:"90%"}} edge={currentEdge}
                selection={selectedTab} onselectionChanged={tabChangedHandler}>
                <ul>
                    <br />
                    {tabsToShow.map((tab: any, index: number) => (
                        <Fragment>
                            <li id={tab.id}>
                                <a>
                                    <span class={`oj-tabbar-item-icon ${tab.class}`}></span>
                                    <span style={{ color: "#ffffff", fontWeight: "600" }}>{tab.title}</span>
                                </a>
                            </li>
                            {(index < tabsToShow.length - 1) ? <br /> : null}
                        </Fragment>
                    ))}
                </ul>

            </oj-tab-bar>
        )
    }

    return (
        <div class="oj-panel oj-sm-margin-2x">
            <div id="demo-container" class="oj-flex demo-edge-start">
                <div class="oj-sm-3 oj-flex-item">{tabElement()}</div>
                <div class="oj-sm-9 oj-flex-item oj-sm-padding-2x-horizontal"><div>
                    <oj-switcher value={selectedTab}>
                        {children}
                    </oj-switcher>
                </div>
                </div>


            </div>
        </div>
    )
}


