import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { useEffect } from 'react'
import { Footer } from "../components/app-layout/Footer";
import { Header } from "../components/app-layout/header/Header";
import { useStore } from "../modules/store";
import { LoginPage } from "../views/login/Login";
import Notifications from '../components/notification/Notification';

export const Main = observer(() => {
    const { authStore: { populateAuth } } = useStore();

    useEffect(() => {
        populateAuth();
    }, [populateAuth])

    return (
        <div id="appContainer" class="oj-web-applayout-page">
            <Header />
            <div class="app-container">
                <div class="app-content-container">
                    <Outlet />
                </div>
            </div>
            <Notifications />
            <Footer />
        </div>
    )
});