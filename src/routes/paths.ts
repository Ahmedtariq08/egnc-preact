import { Icons } from "../constants/iconsData";
import { UserRole } from "../modules/auth/authService";

export enum Paths {
    Root = '/',
    Login = '/login',
    EGNC = '/egnc',
    Dashboard = 'dashboard',
    ProductManagement = 'product-management',
    PendingRequests = 'pending-requests',
    PendingApprovals = 'pending-approvals',
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
    [Paths.Login, { displayName: "Login" }],
    [Paths.Dashboard, { displayName: "Dashboard" }],
    [Paths.ProductManagement, { displayName: "Product Management", order: 1, icon: Icons.icons.ProductManagement, }],
    [Paths.PendingRequests, { displayName: "Pending Requests", order: 2, icon: Icons.icons.pendingRequests }],
    [Paths.PendingApprovals, { displayName: "Pending Approvals", order: 3, icon: Icons.icons.pendingApprovals }],
    [Paths.AdminPanel, { displayName: "Admin Panel", order: 4, icon: Icons.icons.adminPanel }],
    [Paths.Reports, { displayName: "Reports", order: 5, icon: Icons.icons.reports }],
    [Paths.Dossiers, { displayName: "Dossiers", order: 6, icon: Icons.icons.dossiers }],
]);

/* Mapping used in dashboard cards and side drawer over path access for roles */
export const RoleToPathMap = new Map<UserRole, Paths[]>([
    [UserRole.ADMIN, [Paths.ProductManagement, Paths.PendingRequests, Paths.PendingApprovals, Paths.AdminPanel, Paths.Reports, Paths.Dossiers]],
    [UserRole.COMPLIANCE_MANAGER, [Paths.ProductManagement, Paths.PendingRequests, Paths.PendingApprovals, Paths.Reports, Paths.Dossiers]],
    [UserRole.TITLE_BLOCK_VIEWER, [Paths.ProductManagement, Paths.Reports]],
    [UserRole.REPORT_VIEWER, [Paths.ProductManagement, Paths.Reports]],
    [UserRole.SUPPLIER, [Paths.PendingRequests]]
]);