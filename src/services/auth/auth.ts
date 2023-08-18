export enum UserRole {
    ADMIN = "ROLE_Admin",
    COMPLIANCE_MANAGER = "ROLE_Compliance Manager",
    SUPPLIER = "ROLE_Supplier",
    TITLE_BLOCK_VIEWER = "ROLE_Title Block Viewer",
    REPORT_VIEWER = "ROLE_Report Viewer"
}
export interface UserPermissions {
    phone: string;
    roles: { name: UserRole, id: number }[];
    company: string;
    id: number;
    email: string;
    username: string;
}

export interface UserPermissionsStorage extends UserPermissions {
    isAdmin: boolean;
    isSupplier: boolean;
    isManager: boolean;
    canUserRequestCompliance: boolean
}