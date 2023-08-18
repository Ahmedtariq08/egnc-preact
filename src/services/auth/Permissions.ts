// import { Config, APIs } from "../../json/JsonHandler";
// import { Response } from "../../utils/generic/Response";
// import { Message } from "../../utils/generic/Message";
import { UserRole, UserPermissions, UserPermissionsStorage } from "./auth";

// const parsedAuthUrl = APIs.urls.User; 
const permissionSessionEntry = "userPermissions"

/**
 * @description These permissions to be used in refactoring of containers / components
 */
export const isAdmin = () => { return getValueFromStorage('isAdmin') as boolean; }
export const isSupplier = () => { return getValueFromStorage('isSupplier') as boolean; }
export const isManager = () => { return getValueFromStorage('isManager') as boolean; }
export const canRequestCompliance = () => { return getValueFromStorage('canUserRequestCompliance') as boolean; }
export const getUserId = () => { return getValueFromStorage('id') as number };
export const getUserName = () => { return getValueFromStorage('username') as string };
export const getRoles = (): UserRole[] => {
    let roles = getValueFromStorage('roles') as { name: UserRole, id: number }[];
    return Array.isArray(roles) ? roles.map(role => role.name) : [];
}

/**
 * 
 * @returns Response data object with relevant User Permissions of type UserPermissionsStorage
 * @description Returns from session storage if present, otherwise make API call to get permission
 * and set them in session storage
 */
// export const getUserPermissions = async () => {
//     let result = new Response();
//     if (permissionSessionEntry in localStorage) {
//         result.data = JSON.parse(localStorage.getItem(permissionSessionEntry)) as UserPermissionsStorage;
//     } else {
//         let url = Config.AUTH_backend + parsedAuthUrl.base + parsedAuthUrl.extensions.userPermissions;
//         let response = await fetch(url, {credentials: "include", method: 'GET',});
//         if (response.ok) {
//             let permissions = await response.json() as UserPermissions;
//             const processedPermissions = processPermissions(permissions);
//             localStorage.setItem(permissionSessionEntry, JSON.stringify(processedPermissions));
//             result.data = processedPermissions as UserPermissionsStorage;
//         } else if (response.status == 401) {
//             result.message = new Message("error", "Unauthorized User");
//         } else if (response.status == 403) {
//             result.message = new Message("error", "Unable to access resource");
//         }
//     }
//     return result;
// }

export const clearUserPermissionsFromStorage = () => {
    if (permissionSessionEntry in localStorage) {
        localStorage.removeItem(permissionSessionEntry);
    }
}

const processPermissions = (permissions: UserPermissions): UserPermissionsStorage => {
    const roles = permissions.roles.map(role => role.name);
    const isManager = roles.includes(UserRole.COMPLIANCE_MANAGER);
    const canUserRequestCompliance = roles.includes(UserRole.COMPLIANCE_MANAGER);
    const isAdmin = roles.includes(UserRole.ADMIN);
    const isSupplier = roles.includes(UserRole.SUPPLIER);
    let storagePermissions: UserPermissionsStorage = { ...permissions, isAdmin, isManager, isSupplier, canUserRequestCompliance };
    return storagePermissions;
}

const getValueFromStorage = (key: keyof UserPermissionsStorage) => {
    if (permissionSessionEntry in localStorage) {
        let permissions: UserPermissionsStorage = JSON.parse(localStorage.getItem(permissionSessionEntry)!);
        return permissions[key]
    }
}