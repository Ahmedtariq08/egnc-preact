import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '../modules/store';

const apiClient = axios.create({
    withCredentials: true,
    baseURL: process.env.BASE_URL,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const requests = {
    get: <T>(url: string, config?: AxiosRequestConfig) => apiClient.get<T>(url, config).then(responseBody),
    post: <T>(url: string, body?: {}, config?: AxiosRequestConfig) => apiClient.post<T>(url, body ?? {}, config).then(responseBody),
    put: <T>(url: string, body?: {}, config?: AxiosRequestConfig) => apiClient.put<T>(url, body ?? {}, config).then(responseBody),
    del: <T>(url: string, config?: AxiosRequestConfig) => apiClient.delete<T>(url, config).then(responseBody),
}

apiClient.interceptors.response.use(async response => {
    //handle success here
    return response;
}, (error: AxiosError) => {
    //handle error here
    const { data, status, config, headers } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            //handle bad request
            break;
        case 401:
            const redirectIfNotAuthorized = async () => {
                await store.authStore.checkSignedIn()
            }
            redirectIfNotAuthorized();
            store.commonStore.showNotification("error", "Unauthorised. Session expired.");
            break;
        case 403:
            //handle forbidden
            break;
        case 404:
            //handle not found
            // router.navigate('/not-found');
            break;
        case 500:
            //handle server error
            break;
        default:
            break;
    }
    return Promise.reject(error);
})

