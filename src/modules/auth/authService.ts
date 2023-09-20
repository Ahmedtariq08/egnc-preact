import { requests, URLs } from "../../api";

//ANCHOR - Interfaces
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

//ANCHOR - APIs
const { USERS } = URLs.AUTH;
export const Auth = {
        loginUser: (username: string, password: string) => requests.post<{ token: string }>(`${USERS}/authenticate`, { username, password }),
        logoutUser: () => requests.post<void>(`${USERS}/logout`),
        permissions: () => requests.get<UserPermissions>(`${USERS}/permissions`)
}

//ANCHOR - Service
const tokenEntry = 'jwt'
const permissionSessionEntry = "userPermissions"

export class AuthService {

        public static setTokenInStorage = (token: string) => {
                token && localStorage.setItem(tokenEntry, token);
        }

        public static getTokenFromStorage = (): string | null => {
                return localStorage.getItem(tokenEntry);
        }

        public static setPermissionsInStorage = (permissions: UserPermissionsStorage) => {
                permissions && localStorage.setItem(permissionSessionEntry, JSON.stringify(permissions));
        }

        public static getPermissionsFromStorage = (): UserPermissionsStorage | null => {
                let permissions = localStorage.getItem(permissionSessionEntry);
                return permissions ? JSON.parse(permissions) : null;
        }

        public static processPermissions = (permissions: UserPermissions): UserPermissionsStorage => {
                const roles = permissions.roles.map(role => role.name);
                const isManager = roles.includes(UserRole.COMPLIANCE_MANAGER);
                const canUserRequestCompliance = roles.includes(UserRole.COMPLIANCE_MANAGER);
                const isAdmin = roles.includes(UserRole.ADMIN);
                const isSupplier = roles.includes(UserRole.SUPPLIER);
                let storagePermissions: UserPermissionsStorage = { ...permissions, isAdmin, isManager, isSupplier, canUserRequestCompliance };
                AuthService.setPermissionsInStorage(storagePermissions);
                return storagePermissions;
        }

        public static clearStorage = () => {
                localStorage.removeItem(tokenEntry);
                localStorage.removeItem(permissionSessionEntry);
        }
}