import { requests } from "./apiClient";

export const APIs = {
    AUTH: {
        loginUser: (username: string, password: string) => requests.post<{ token: string }>('/auth/users/authenticate', { username, password }),
        logoutUser: () => requests.post('auth//users/logout'),
        permissions: () => requests.get<void>('auth/users/permissions')
    }
}
