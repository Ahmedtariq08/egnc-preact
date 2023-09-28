import { requests, URLs } from "../../../api";

// ANCHOR - Interfaces
export interface Roles {
    id: number;
    name: string;
    description: string;
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

// ANCHOR - APIs
const { USERS, ROLES } = URLs.AUTH;

export const UserApis = {
    getAllUsers: async () => await requests.get<User[]>(`${USERS}/`),
    getRoles: async () => await requests.get<Roles[]>(`${ROLES}/`),
    resetPassword: async (userId: string) => await requests.post<string>(`${USERS}/reset/${userId}`),
    createUser: async (newUser: NewUser) =>
        await requests.post<User>(`${USERS}/register/`, {
            ...newUser,
            active: (!!newUser.active).toString(),
            provider: "EGNC",
        }),
    updateUser: async (user: NewUser) => await requests.post<User>(`${USERS}/update`, user),
};

// ANCHOR - Utility Functions

export const getNewUser = (): NewUser => {
    return {
        username: "",
        email: "",
        roles: [],
        name: "",
        company: "",
        phone: "",
        businessTitle: "",
        active: false,
    };
};

export const copyUserFields = (user: User): NewUser => {
    const {
        id,
        provider,
        isApplication,
        createdBy,
        createdDate,
        lastModifiedBy,
        lastModifiedDate,
        ...newUserFields
    } = user;
    return newUserFields;
};

export const mapRolesToName = (users: User[]): User[] => {
    return users.map((user) => {
        return {
            ...user,
            roles: user.roles.map((role) => {
                return typeof role === "string" ? role : role.name;
            }),
        };
    });
};
