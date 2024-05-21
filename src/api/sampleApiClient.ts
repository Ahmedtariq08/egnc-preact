import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import ENV from "../../config";
import https from "https";
import { DEFAULTS } from "../../utils/constants";
import { ApiResponse } from "../../utils/types";

const { BASE_URL } = ENV;

// Types API
interface SuccessApiResponse<T> {
    data: T;
    error: null;
    isSuccess: true;
}

interface ErrorApiResponse<T> {
    data: null;
    error: { statusCode: number; message: string };
    isSuccess: false;
}

export type ApiResponse<T> = SuccessApiResponse<T> | ErrorApiResponse<T>;

// Axios Client
const apiClient = axios.create({
    baseURL: BASE_URL,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});

const getAuthConfig = (token: string, config?: AxiosRequestConfig): AxiosRequestConfig => {
    const headerToken: AxiosRequestConfig = {
        maxBodyLength: Infinity,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return config ? { ...config, ...headerToken } : headerToken;
};

const handleResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => {
    return {
        data: response.data,
        error: null,
        isSuccess: true,
    };
};

const handleError = <T>(error: AxiosError): ApiResponse<T> => {
    return {
        data: null,
        error: { statusCode: error.response?.status ?? DEFAULTS.ErrorStatusCode, message: error.message },
        isSuccess: false,
    };
};

export const requests = {
    get: async <T>(url: string, token: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        try {
            const response = await apiClient.get<T>(url, getAuthConfig(token, config));
            return handleResponse(response);
        } catch (error: any) {
            return handleError(error);
        }
    },
    post: async <T>(
        url: string,
        token: string,
        body?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<ApiResponse<T>> => {
        try {
            const response = await apiClient.post<T>(url, body ?? {}, getAuthConfig(token, config));
            return handleResponse(response);
        } catch (error: any) {
            return handleError(error);
        }
    },
    put: async <T>(
        url: string,
        token: string,
        body?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<ApiResponse<T>> => {
        try {
            const response = await apiClient.put<T>(url, body ?? {}, getAuthConfig(token, config));
            return handleResponse(response);
        } catch (error: any) {
            return handleError(error);
        }
    },
    del: async <T>(url: string, token: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        try {
            const response = await apiClient.delete<T>(url, getAuthConfig(token, config));
            return handleResponse(response);
        } catch (error: any) {
            return handleError(error);
        }
    },
};

apiClient.interceptors.response.use(
    async (response) => {
        // handle success here
        return response;
    },
    async (error: AxiosError) => {
        // handle error here
        const status = error.response?.status;
        switch (status) {
            case 400:
                error.message = "Bad Request.";
                break;
            case 401: {
                error.message = "User unauthorized.";
                break;
            }
            case 403:
                error.message = "Forbidden resource.";
                break;
            case 404:
                error.message = "Not found.";
                break;
            case 500:
                error.message = "Internal Server Error.";
                break;
            default:
                break;
        }
        return await Promise.reject(error);
    },
);
