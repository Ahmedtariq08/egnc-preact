import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { Main } from './Main';
import Dashboard from '../views/dashboard/Dashboard';

const Paths = {
    Root: '/',
    Dashboard: 'dashboard',
    ProductManagement: 'productManagement'
}

//used in Link to={} or useNavigate
export const NavigateTo = {
    Login: Paths.Root,
    Dashboard: `/${Paths.Dashboard}`

}


export const routes: RouteObject[] = [
    {
        path: Paths.Root,
        element: <Main />,
        children: [
            { path: Paths.Dashboard, element: <Dashboard /> }
        ]
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

