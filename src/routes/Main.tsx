import { observer } from "mobx-react-lite";
import "ojs/ojbutton";
import "ojs/ojdrawerlayout";
import "ojs/ojnavigationlist";
import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { Footer } from "../components/app-layout/Footer";
import { Header } from "../components/app-layout/header/Header";
import Notifications from '../components/notification/Notification';
import { useStore } from "../modules/store";
import { Drawer } from "../components/app-layout/Drawer";

export const Main = observer(() => {
    const { authStore: { populateAuth }, layoutStore: { isDrawerOpened } } = useStore();

    useEffect(() => {
        populateAuth();
    }, [populateAuth])

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