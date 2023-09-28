import { Icons } from "../constants/iconsData";
import { UserRole } from "../modules/auth/authService";

// NOTE - This file must contain all the relevant constants and configuration related to routing / redirection

export enum Pages {
    Root = "/",
    Login = "login",
    Dashboard = "dashboard",
    ProductManagement = "product-management",
    ProductManagementFetch = "product-management/fetch",
    PendingRequests = "pending-requests",
    PendingApprovals = "pending-approvals",
    AdminPanel = "admin-panel",
    Reports = "reports",
    Dossiers = "doessiers",
    Declaration = "declaration",
}

export enum Paths {
    Root = "/",
    Login = "/login",
    EGNC = "/egnc",
    Dashboard = "/egnc/dashboard",
    ProductManagement = "/egnc/product-management",
    ProductManagementFetch = "/egnc/product-management/fetch/:category",
    PendingRequests = "/egnc/pending-requests",
    PendingApprovals = "/egnc/pending-approvals",
    AdminPanel = "/egnc/admin-panel",
    Reports = "/egnc/reports",
    Dossiers = "/egnc/doessiers",
    Declaration = "/egnc/declaration/:id",
}

// ANCHOR - Navigation setting for paths used in dashboard cards, sidebar, breadcrumbs, favorites and recents
interface PathDetails {
    displayName: string;
    path: Paths;
    order?: number; // required for order in drawer and conveyor cards
    icon?: string;
}

export const NavData = new Map<Pages, PathDetails>([
    [Pages.Login, { displayName: "Login", path: Paths.Login }],
    [Pages.Dashboard, { displayName: "Dashboard", path: Paths.Dashboard }],
    [
        Pages.ProductManagement,
        {
            displayName: "Product Management",
            path: Paths.ProductManagement,
            order: 1,
            icon: Icons.icons.ProductManagement,
        },
    ],
    [
        Pages.ProductManagementFetch,
        {
            displayName: "Product Management",
            path: Paths.ProductManagementFetch,
            order: 1,
            icon: Icons.icons.ProductManagement,
        },
    ],
    [
        Pages.PendingRequests,
        {
            displayName: "Pending Requests",
            path: Paths.PendingRequests,
            order: 2,
            icon: Icons.icons.pendingRequests,
        },
    ],
    [
        Pages.PendingApprovals,
        {
            displayName: "Pending Approvals",
            path: Paths.PendingApprovals,
            order: 3,
            icon: Icons.icons.pendingApprovals,
        },
    ],
    [
        Pages.AdminPanel,
        { displayName: "Admin Panel", order: 4, path: Paths.AdminPanel, icon: Icons.icons.adminPanel },
    ],
    [Pages.Reports, { displayName: "Reports", order: 5, path: Paths.Reports, icon: Icons.icons.reports }],
    [Pages.Dossiers, { displayName: "Dossiers", order: 6, path: Paths.Dossiers, icon: Icons.icons.dossiers }],
    [Pages.Declaration, { displayName: "Declaration", path: Paths.Declaration }],
]);

/* Mapping used in dashboard cards and side drawer over path access for roles */
export const RoleToPathMap = new Map<UserRole, Pages[]>([
    [
        UserRole.ADMIN,
        [
            Pages.ProductManagement,
            Pages.PendingRequests,
            Pages.PendingApprovals,
            Pages.AdminPanel,
            Pages.Reports,
            Pages.Dossiers,
        ],
    ],
    [
        UserRole.COMPLIANCE_MANAGER,
        [
            Pages.ProductManagement,
            Pages.PendingRequests,
            Pages.PendingApprovals,
            Pages.Reports,
            Pages.Dossiers,
        ],
    ],
    [UserRole.TITLE_BLOCK_VIEWER, [Pages.ProductManagement, Pages.Reports]],
    [UserRole.REPORT_VIEWER, [Pages.ProductManagement, Pages.Reports]],
    [UserRole.SUPPLIER, [Pages.PendingRequests]],
]);
