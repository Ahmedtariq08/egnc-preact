import axios, { AxiosError, AxiosResponse } from 'axios';
import { ojMessage } from "@oracle/oraclejet/ojmessage";

export interface ApiResponse<T> {
    isSuccess: boolean,
    error?: AxiosError,
    data?: T,
    message?: ojMessage.Message
}

const apiClient = axios.create({
    withCredentials: true,
    baseURL: process.env.BASE_URL,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// const successHandler = <T>(response: AxiosResponse<T>): ApiResponse<T> => {
//     return {
//         isSuccess: true,
//         data: response.data
//     }
// };

// const errorHandler = <T>(error: AxiosError<T>): ApiResponse<T> => {
//     //handle status codes here
//     return {
//         isSuccess: false,
//         data: error.response?.data,
//         error: error
//     }
// }

export const requests = {
    get: <T>(url: string) => apiClient.get<T>(url).then(responseBody),
    post: <T>(url: string, body?: {}) => apiClient.post<T>(url, body ?? {}).then(responseBody),
    put: <T>(url: string, body?: {}) => apiClient.put<T>(url, body ?? {}).then(responseBody),
    del: <T>(url: string) => apiClient.delete<T>(url).then(responseBody),
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
            //handle unauthorized
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

