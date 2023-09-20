import { requests, URLs } from "../../../api"

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


//ANCHOR - APIs
const { USERS, ROLES } = URLs.AUTH;

export const UserApis = {
    getAllUsers: () => requests.get<User[]>(`${USERS}/`),
    getRoles: () => requests.get<Roles[]>(`${ROLES}/`),
    resetPassword: (userId: string) => requests.post<string>(`${USERS}/reset/${userId}`),
    createUser: (newUser: NewUser) => requests.post<User>(`${USERS}/register/`,
        { ...newUser, active: (!!newUser.active).toString(), provider: "EGNC" }),
    updateUser: (user: NewUser) => requests.post<User>(`${USERS}/update`, user)
}

//ANCHOR - Service
export class UserService {

    public static getNewUser = (): NewUser => {
        return { username: '', email: '', roles: [], name: '', company: '', phone: '', businessTitle: '', active: false }
    }

    public static copyUserFields = (user: User): NewUser => {
        const { id, provider, isApplication, createdBy, createdDate, lastModifiedBy, lastModifiedDate, ...newUserFields } = user;
        return newUserFields;
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