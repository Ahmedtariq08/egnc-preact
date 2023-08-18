import { FunctionComponent } from 'react';
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { Footer } from "../components/app-layout/Footer";
import { Header } from "../components/app-layout/Header";
import Notifications from '../components/notification/Notification';
import { LoginPage } from '../views/login/Login';

const Paths = {
    Root: '/',
    Dashboard: 'dashboard',
    ProductManagement: 'productManagement'
}

//used in Link to={} or useNavigate
export const NavigateTo = {
    Login: Paths.Root,

}


export const routes: RouteObject[] = [
    {
        path: Paths.Root,
        element: <LoginPage />,
        // children: [
        //     {
        //         element: <RequireAuth />, children: [
        //             { path: Paths.Activities, element: <ActivityDashboard /> },
        //             { path: Paths.Activity, element: <ActivityDetails /> },
        //             { path: Paths.CreateActivity, element: <ActivityForm key={'create'} /> },
        //             { path: Paths.ManageActivity, element: <ActivityForm key={'manage'} /> },
        //             { path: Paths.Profile, element: <ProfilePage /> },
        //             { path: Paths.Login, element: <LoginForm /> },
        //             { path: Paths.Errors, element: <TestErrors /> },
        //         ]
        //     },
        //     { path: Paths.NotFound, element: <NotFound /> },
        //     { path: Paths.ServerError, element: <ServerError /> },
        //     { path: Paths.RegisterSuccess, element: <RegisterSuccess /> },
        //     { path: Paths.VerifyEmail, element: <ConfirmEmail /> },
        //     { path: '*', element: <Navigate replace to={NavigateTo.NotFound} /> },
        // ]
    }
]

export const router = createBrowserRouter(routes);

// const PageWrapper = (Component: FunctionComponent) => {
//     const isAuthenticated = AuthService.getUsernameFromStorage();
//     const WrappedPage = () => {
//         return (
//         <div id="appContainer" class="oj-web-applayout-page">
//             <Header />
//             <div class="app-container">
//                 <div class="app-content-container">
//                     <Component />
//                 </div>
//             </div>
//             <Notifications />
//             <Footer />
//         </div>)
//     }
//     return isAuthenticated ? <WrappedPage /> : <Navigate to={Paths.LOGIN} />
// }

