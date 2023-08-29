import { requests } from "../../../api/apiClient"

//ANCHOR - Interfaces 
export interface Roles {
    id: number;
    name: string;
    description: any;
}

export interface NewUser {
    username: string;
    email: string;
    roles: Roles[] | string[];
    name?: string;
    company?: string;
    phone?: string;
    businessTitle?: string;
    active?: boolean;
}

export interface User extends NewUser {
    id: number;
    provider: string;
    isApplication: boolean;
    createdBy: number;
    createdDate?: string;
    lastModifiedBy: number;
    lastModifiedDate?: string;
}

// export const getUserFromObject = (jsonObject: Object) : User => {
//     const user: User = {
//         id: undefined,
//         provider: data.provider,
//         isApplication: data.isApplication,
//         createdBy: data.createdBy,
//         lastModifiedBy: data.lastModifiedBy,
//     };

//     for (const key in data) {
//         if (key in user) {
//             user[key] = data[key];
//         }
//     }

//     return user;
// }
//ANCHOR - APIs
export const UserApis = {
    getAllUsers: () => requests.get<User[]>('/auth/users/'),
    getRoles: () => requests.get<Roles[]>('/auth/roles/'),
}

//ANCHOR - Service
export class UserService {

    public static getNewUser = (): NewUser => {
        return { username: '', email: '', roles: [], name: '', company: '', phone: '', businessTitle: '', active: false }
    }

    public static mapRolesToName = (users: User[]): User[] => {
        return users.map((user) => {
            return {
                ...user, roles: user.roles.map((role) => {
                    return typeof role === "string" ? role : role.name
                })
            }
        })
    }
}