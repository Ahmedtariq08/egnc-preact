/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, {
    type AxiosError,
    type AxiosRequestConfig,
    type AxiosResponse,
} from "axios";
import { store } from "../modules/store";

const apiClient = axios.create({
    withCredentials: true,
    baseURL: process.env.BASE_URL,
});

const responseBody = <T>(response: AxiosResponse<T>): T => response.data;

export const requests = {
    get: async <T>(url: string, config?: AxiosRequestConfig) =>
        await apiClient.get<T>(url, config).then(responseBody),
    post: async <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
        await apiClient.post<T>(url, body ?? {}, config).then(responseBody),
    put: async <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
        await apiClient.put<T>(url, body ?? {}, config).then(responseBody),
    del: async <T>(url: string, config?: AxiosRequestConfig) =>
        await apiClient.delete<T>(url, config).then(responseBody),
};

apiClient.interceptors.response.use(
    async (response) => {
        // handle success here
        return response;
    },
    async (error: AxiosError) => {
        // handle error here
        const { data, status, config, headers } =
            error.response as AxiosResponse;
        switch (status) {
            case 400:
                // handle bad request
                break;
            case 401: {
                const redirectIfNotAuthorized = async (): Promise<void> => {
                    await store.authStore.checkSignedIn();
                };
                void redirectIfNotAuthorized();
                store.commonStore.showNotification(
                    "error",
                    "Unauthorised. Session expired.",
                );
                break;
            }
            case 403:
                // handle forbidden
                break;
            case 404:
                // handle not found
                // router.navigate('/not-found');
                break;
            case 500:
                // handle server error
                break;
            default:
                break;
        }
        return await Promise.reject(error);
    },
);
