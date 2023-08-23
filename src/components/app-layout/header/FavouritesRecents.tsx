import { Icons } from "../../../constants/iconsData";
import { useState, useEffect } from 'react';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import { Link } from "react-router-dom";

enum FavAndRecent {
    Favourite = "Favourites",
    Recents = "Recent Items"
};

const data = Object.values(FavAndRecent).map(value => ({ value: value, label: value }));
const dataProvider = new MutableArrayDataProvider(data, { keyAttributes: "value" });

const testRecents = new MutableArrayDataProvider([
    { id: 1, displayName: 'Dashboard', url: '/dashboard' },
    { id: 2, displayName: 'Reports', url: '/reports' },
    { id: 3, displayName: 'Product Management', url: '/productManagement' },
], { keyAttributes: "value" });
const testFavourites = new MutableArrayDataProvider([
    { id: 1, displayName: 'Dashboard', url: '/dashboard' },
    { id: 2, displayName: 'Reports', url: '/reports' },
    { id: 3, displayName: 'Product Management', url: '/productManagement' },
    { id: 3, displayName: 'Product Management', url: '/productManagement' },
    { id: 3, displayName: 'Product Management', url: '/productManagement' },
    { id: 3, displayName: 'Product Management', url: '/productManagement' },
    { id: 3, displayName: 'Product Management', url: '/productManagement' },
    { id: 3, displayName: 'Product Management', url: '/productManagement' },
    { id: 3, displayName: 'Product Management', url: '/productManagement' },
    { id: 3, displayName: 'Product Management', url: '/productManagement' },
    { id: 3, displayName: 'Product Management', url: '/productManagement' },
    { id: 3, displayName: 'Product Management', url: '/productManagement' },
    { id: 3, displayName: 'Product Management', url: '/productManagement' },
    { id: 3, displayName: 'Product Management', url: '/productManagement' },
], { keyAttributes: "value" });

export const FavouritesAndRecents = () => {

    const [selectedTab, setSelectedTab] = useState<FavAndRecent>(FavAndRecent.Recents);

    const getFavouritesAndRecents = () => {
        console.log("api call goes");
    }

    const FavouritesList = () => {
        return (
            <div class="oj-panel oj-sm-margin-2x">
                <oj-list-view id="listview" data={testFavourites} class="oj-listview-item-padding-off favDiv">
                    <template slot="itemTemplate" render={(item) =>
                        <li id={item.data.id}>
                            <a href="#">
                                <span>{item.data.displayName}</span>
                            </a>
                            <a href="#" on-click="[[removeRecentItem]]" class="oj-link-embedded oj-disabled oj-link-standalone oj-link-subtle-primary">
                                <span class="oj-ux-icon-size-3x" className={Icons.icons.cross}></span>
                            </a>
                        </li>
                    } />
                </oj-list-view>
            </div>
        )
    }

    const RecentsList = () => {
        return (
            <div slot="Recent Items" id="Recent Items" role="tabpanel" aria-labelledby="Recent Items-tab">
                <div class="oj-panel oj-sm-margin-2x">
                    <oj-list-view id="listview" data={testRecents} class="oj-listview-item-padding-off favDiv">
                        <template slot="itemTemplate" render={(item) =>
                            <li id={item.data.id}>
                                <a href="#">
                                    <span>{item.data.displayName}</span>
                                </a>
                                <a href="#" on-click="[[removeRecentItem]]" class="oj-link-embedded oj-disabled oj-link-standalone oj-link-subtle-primary">
                                    <span class="oj-ux-icon-size-3x" className={Icons.icons.cross}></span>
                                </a>
                            </li>
                        } />
                    </oj-list-view>
                </div>
                <oj-button class="searchButtons oj-button-sm" style="padding-right: 10px;" id="add" on-oj-action="[[clearAllRecentItems]]" chroming="callToAction">Clear History</oj-button>
            </div>
        )
    }

    return (
        <oj-menu-button onojAction={getFavouritesAndRecents} display="icons">
            <span slot='endIcon' class={Icons.icons.star}></span>Favorites and Recent Items
            <oj-menu id="myMenu5" slot="menu" class="oj-sm-padding-4x">
                <h5>Favorites and Recent Items</h5>
                <div >
                    <div>
                        <oj-tab-bar
                            edge="top"
                            overflow="popup"
                            selection={selectedTab}
                            onselectionChanged={(event) => setSelectedTab(event.detail.value)}
                            data={dataProvider}>
                            <template slot="itemTemplate" render={(item) =>
                                <li id={item.data.id}>
                                    <a href="#">
                                        <span>{item.data.label}</span>
                                    </a>
                                </li>
                            } />
                        </oj-tab-bar>
                    </div>
                </div>
                {selectedTab === FavAndRecent.Recents ? <RecentsList /> : <FavouritesList />}
            </oj-menu>

        </oj-menu-button>
    )
}