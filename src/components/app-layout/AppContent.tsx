import { observer } from "mobx-react-lite";
import "ojs/ojbutton";
import "ojs/ojdrawerlayout";
import "ojs/ojnavigationlist";
import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./header/Header";
import Notifications from '../notification/Notification';
import { useStore } from "../../modules/store";
import { Drawer } from "./Drawer";

export const AppContent = observer(() => {
    const { authStore: { populateAuth }, layoutStore: { isDrawerOpened }, dashboardStore: { loadAllCards } } = useStore();

    useEffect(() => {
        populateAuth();
        loadAllCards();
    }, [populateAuth, loadAllCards])

    return (
        <div id="appContainer" class="oj-web-applayout-page">
            <Header />
            <div class="app-container">
                <oj-drawer-layout startOpened={isDrawerOpened} class="drawer-height" style={{ border: 0 }}>
                    <div class="app-content-container">
                        <Outlet />
                    </div>
                    <Drawer />
                </oj-drawer-layout>
            </div>
            <Notifications />
            <Footer />
        </div>
    )
});