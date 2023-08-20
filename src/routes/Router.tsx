import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { AppContent } from '../components/app-layout/AppContent';
import Dashboard from '../views/dashboard/Dashboard';
import { LandingPage } from '../views/landing-view/LandingPage';
import { LoginPage } from '../views/login/Login';
import { Paths } from './paths';
import { ProductManagement } from '../views/product-management/ProductManagement';
import { PendingView } from '../views/pending-view/PendingView';
import { Reports } from '../views/reports/Reports';
import { Dossiers } from '../views/dossiers/Dossiers';

/**
 * @usage Used in Link or router.navigate functions for redirection purposes
 * @requirement All Paths in app content layer must start with Paths.EGNC
 */
// export const NavigateTo = {
//     Root: Paths.Root,
//     Login: Paths.Login,
//     Dashboard: `${Paths.EGNC}/${Paths.Dashboard}`,
//     ProductManagement: (id: string) => `${Paths.EGNC}/${Paths.ProductManagement}/${id}`
// }

export const routes: RouteObject[] = [
    {
        path: Paths.Root, element: <LandingPage />
    },
    {
        path: Paths.Login, element: <LoginPage />
    },
    {
        path: Paths.EGNC,
        element: <AppContent />,
        children: [
            { path: Paths.Dashboard, element: <Dashboard /> },
            { path: Paths.ProductManagement, element: <ProductManagement /> },
            { path: Paths.PendingRequests, element: <PendingView /> },
            { path: Paths.PendingApprovals, element: <PendingView /> },
            { path: Paths.AdminPanel, element: <Dashboard /> },
            { path: Paths.Reports, element: <Reports /> },
            { path: Paths.Dossiers, element: <Dossiers /> },
        ]
    }
]

export const router = createBrowserRouter(routes);

