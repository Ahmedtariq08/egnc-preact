import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Dashboard from '../views/dashboard/Dashboard';
import { LandingPage } from '../views/landing-view/LandingPage';
import { LoginPage } from '../views/login/Login';
import { Main } from './Main';

const Paths = {
    Root: '/',
    Login: '/login',
    EGNC: '/egnc',
    Dashboard: 'dashboard',
    ProductManagement: 'productManagement'
}

//used in Link to={} or useNavigate
//NOTE - All paths within main app inside header have to start with egnc path
export const NavigateTo = {
    Root: Paths.Root,
    Login: Paths.Login,
    Dashboard: `${Paths.EGNC}/${Paths.Dashboard}`,
    ProductManagement: (id: string) => `${Paths.EGNC}/${Paths.ProductManagement}/${id}`
}


export const routes: RouteObject[] = [
    {
        path: Paths.Root, element: <LandingPage />
    },
    {
        path: Paths.Login, element: <LoginPage />
    },
    {
        path: Paths.EGNC,
        element: <Main />,
        children: [
            { path: Paths.Dashboard, element: <Dashboard /> }
        ]
    }
]

export const router = createBrowserRouter(routes);

