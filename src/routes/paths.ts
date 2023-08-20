import { Icons } from "../constants/iconsData";
import { UserRole } from "../modules/auth/authService";

export enum Paths {
    Root = '/',
    Login = '/login',
    EGNC = '/egnc',
    Dashboard = 'dashboard',
    ProductManagement = 'product-management/:category',
    PendingRequests = 'pending-requests/:id/:itemNumber',
    PendingApprovals = 'pending-approvals/:id/:mpnPartNumber',
    AdminPanel = 'admin-panel',
    Reports = 'reports',
    Dossiers = 'doessiers',
}

//ANCHOR - Navigation setting for paths used in dashboard cards, sidebar, breadcrumbs, favorites and recents
interface PathDetails {
    displayName: string,
    order?: number,
    icon?: string,
}

export const NavData = new Map<Paths, PathDetails>([
    [Paths.Login, {
        displayName: "Login"
    }],
    [Paths.Dashboard, {
        displayName: "Dashboard"
    }],
    [Paths.ProductManagement, {
        displayName: "Product Management",
        order: 1,
        icon: Icons.icons.ProductManagement,
    }],
    [Paths.PendingRequests, {
        displayName: "Pending Requests",
        order: 2,
        icon: Icons.icons.pendingRequests
    }],
    [Paths.PendingApprovals, {
        displayName: "Pending Approvals",
        order: 3,
        icon: Icons.icons.pendingApprovals
    }],
    [Paths.AdminPanel, {
        displayName: "Admin Panel",
        order: 4,
        icon: Icons.icons.adminPanel
    }],
    [Paths.Reports, {
        displayName: "Reports",
        order: 5,
        icon: Icons.icons.reports
    }],
    [Paths.Dossiers, {
        displayName: "Dossiers",
        order: 6,
        icon: Icons.icons.dossiers
    }],
]);

//ANCHOR - Redirection 
type Redirect =
    | { page: Paths.Root }
    | { page: Paths.Login }
    | { page: Paths.Dashboard }
    | { page: Paths.ProductManagement; params: { category: string } }
    | { page: Paths.PendingRequests; params: { id: number, itemNumber: string } }
    | { page: Paths.PendingApprovals; params: { id: number, mpnPartNumber: string } }
    | { page: Paths.AdminPanel }
    | { page: Paths.Reports }
    | { page: Paths.Dossiers }

const NoEgncPrefix = [Paths.Root, Paths.Login];
/**
 * @method redirectToPage - Takes dynamic arguements on the basis of page configuration
 * @returns A router path that the react router can navigate to
 */
export const getRedirectionPath = <Page extends Redirect['page']>(
    ...args: Extract<Redirect, { page: Page }> extends { params: infer TParams }
        ? [page: Page, params: TParams]
        : [page: Page]): string => {
    const page = args[0];
    let outputPath = page as string;
    try {
        if (!NoEgncPrefix.includes(page)) {
            const params = args[1] as {};
            for (const key in params) {
                const value = params[key as keyof typeof params];
                outputPath = outputPath.replace(`:${key}`, value as string);
            }
            outputPath = `${Paths.EGNC}/${outputPath}`;
        }
    } catch (error) {
        console.log('Error in redirection');
        console.log(error);
    }
    return outputPath;
};


/* Mapping used in dashboard cards and side drawer over path access for roles */
export const RoleToPathMap = new Map<UserRole, Paths[]>([
    [UserRole.ADMIN, [Paths.ProductManagement, Paths.PendingRequests, Paths.PendingApprovals, Paths.AdminPanel, Paths.Reports, Paths.Dossiers]],
    [UserRole.COMPLIANCE_MANAGER, [Paths.ProductManagement, Paths.PendingRequests, Paths.PendingApprovals, Paths.Reports, Paths.Dossiers]],
    [UserRole.TITLE_BLOCK_VIEWER, [Paths.ProductManagement, Paths.Reports]],
    [UserRole.REPORT_VIEWER, [Paths.ProductManagement, Paths.Reports]],
    [UserRole.SUPPLIER, [Paths.PendingRequests]]
]);