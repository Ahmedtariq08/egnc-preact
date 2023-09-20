import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
// import { ojMessage } from "@oracle/oraclejet/ojmessage";
// import { router } from '../routes/Router';
// import { Paths } from '../routes/paths';
// import { store } from '../modules/store';
// import { AuthService } from '../modules/auth/authService';
import { EnvServices } from '../models';

// export interface ApiResponse<T> {
//     isSuccess: boolean,
//     error?: AxiosError,
//     data?: T,
//     message?: ojMessage.Message
// }

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

// apiClient.interceptors.response.use(async response => {
//     //handle success here
//     return response;
// }, (error: AxiosError) => {
//     //handle error here
//     const { data, status, config, headers } = error.response as AxiosResponse;
//     switch (status) {
//         case 400:
//             //handle bad request
//             break;
//         case 401:
//             store.commonStore.showNotification("error", "Unauthorised. Session expired.");
//             // AuthService.clearStorage();
//             // // store.authStore.logoutUser();
//             // const currentState = router.state;
//             // console.log(currentState);
//             // router.navigate(Paths.Login, { state: currentState });
//             break;
//         case 403:
//             //handle forbidden
//             break;
//         case 404:
//             //handle not found
//             // router.navigate('/not-found');
//             break;
//         case 500:
//             //handle server error
//             break;
//         default:
//             break;
//     }
//     return Promise.reject(error);
// })

