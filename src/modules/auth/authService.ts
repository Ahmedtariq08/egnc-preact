import { requests, URLs } from "../../api";

// ANCHOR - Interfaces
export enum UserRole {
    ADMIN = "ROLE_Admin",
    COMPLIANCE_MANAGER = "ROLE_Compliance Manager",
    SUPPLIER = "ROLE_Supplier",
    TITLE_BLOCK_VIEWER = "ROLE_Title Block Viewer",
    REPORT_VIEWER = "ROLE_Report Viewer",
}
export interface UserPermissions {
    phone: string;
    roles: Array<{ name: UserRole; id: number }>;
    company: string;
    id: number;
    email: string;
    username: string;
}

export interface UserPermissionsStorage extends UserPermissions {
    isAdmin: boolean;
    isSupplier: boolean;
    isManager: boolean;
    canUserRequestCompliance: boolean;
}

// ANCHOR - APIs
const { USERS } = URLs.AUTH;
export const Auth = {
    loginUser: async (username: string, password: string) =>
        await requests.post<{ token: string }>(`${USERS}/authenticate`, { username, password }),
    logoutUser: async () => {
        await requests.post(`${USERS}/logout`);
    },
    permissions: async () => await requests.get<UserPermissions>(`${USERS}/permissions`),
};

// ANCHOR - Service / Utility functions
const tokenEntry = "jwt";
const permissionSessionEntry = "userPermissions";

export const setTokenInStorage = (token: string) => {
    token && localStorage.setItem(tokenEntry, token);
};

export const getTokenFromStorage = (): string | null => {
    return localStorage.getItem(tokenEntry);
};

export const setPermissionsInStorage = (permissions: UserPermissionsStorage) => {
    permissions && localStorage.setItem(permissionSessionEntry, JSON.stringify(permissions));
};

export const getPermissionsFromStorage = (): UserPermissionsStorage | null => {
    const permissions = localStorage.getItem(permissionSessionEntry);
    return permissions ? JSON.parse(permissions) : null;
};

export const getUserId = () => {
    const permissions = getPermissionsFromStorage();
    return permissions?.id;
};

export const processPermissions = (permissions: UserPermissions): UserPermissionsStorage => {
    const roles = permissions.roles.map((role) => role.name);
    const isManager = roles.includes(UserRole.COMPLIANCE_MANAGER);
    const canUserRequestCompliance = roles.includes(UserRole.COMPLIANCE_MANAGER);
    const isAdmin = roles.includes(UserRole.ADMIN);
    const isSupplier = roles.includes(UserRole.SUPPLIER);
    const storagePermissions: UserPermissionsStorage = {
        ...permissions,
        isAdmin,
        isManager,
        isSupplier,
        canUserRequestCompliance,
    };
    setPermissionsInStorage(storagePermissions);
    return storagePermissions;
};

export const clearStorage = () => {
    localStorage.removeItem(tokenEntry);
    localStorage.removeItem(permissionSessionEntry);
};
