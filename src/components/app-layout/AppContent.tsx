import { observer } from "mobx-react-lite";
import "ojs/ojbutton";
import "ojs/ojdrawerlayout";
import "ojs/ojnavigationlist";
import { useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { useStore } from "../../modules/store";
import { Paths, updateDocumentTitle } from "../../routes/paths";
import Notifications from '../notification/Notification';
import { BreadCrumbs } from "./Breadcrumbs";
import { Drawer } from "./Drawer";
import { Footer } from "./Footer";
import { Header } from "./header/Header";

export const AppContent = observer(() => {
    const { authStore: { populateAuth, checkSignedIn }, layoutStore: { isDrawerOpened }, dashboardStore: { loadConveyorCards } } = useStore();

    const location = useLocation();
    updateDocumentTitle(location.pathname);
    console.log(location.pathname);
    console.log(Paths.Dashboard);
    const isDashboardPage = location.pathname === Paths.Dashboard;

    useEffect(() => {
        populateAuth();
        loadConveyorCards();
    }, [populateAuth, loadConveyorCards])

    return (
        <div id="appContainer" class="oj-web-applayout-page">
            <Header />
            <div class="app-container">
                <oj-drawer-layout startOpened={isDrawerOpened} class="drawer-height" style={{ border: 0 }}>
                    {isDashboardPage ? <Outlet /> :
                        <div class="app-content-container">
                            <BreadCrumbs />
                            <Outlet />
                        </div>}
                    <Drawer />
                </oj-drawer-layout>
            </div>
            <Notifications />
            <Footer />
        </div>
    )
});