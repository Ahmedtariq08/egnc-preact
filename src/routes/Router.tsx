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