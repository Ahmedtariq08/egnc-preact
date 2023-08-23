import { observer } from "mobx-react-lite";
import "ojs/ojbutton";
import "ojs/ojdrawerlayout";
import "ojs/ojnavigationlist";
import { useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./header/Header";
import Notifications from '../notification/Notification';
import { useStore } from "../../modules/store";
import { Drawer } from "./Drawer";
import { updateDocumentTitle } from "../../routes/paths";
import { SkeletonTheme } from "react-loading-skeleton";

export const AppContent = observer(() => {
    const { authStore: { populateAuth }, layoutStore: { isDrawerOpened }, dashboardStore: { loadAllCards } } = useStore();

    const location = useLocation();
    updateDocumentTitle(location.pathname);

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
                        <SkeletonTheme
                            baseColor="#5294e0"
                            highlightColor="#96c7ff"
                            borderRadius="0.5rem"
                            duration={4}
                        >
                            <Outlet />
                        </SkeletonTheme>
                    </div>
                    <Drawer />
                </oj-drawer-layout>
            </div>
            <Notifications />
            <Footer />
        </div>
    )
});