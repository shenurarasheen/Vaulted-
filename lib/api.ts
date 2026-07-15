import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export interface ApiResponse<T = unknown> {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: T;
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1",
});

api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        if (config.headers) {
            delete config.headers["Content-Type"];
            delete config.headers["content-type"];
        }
    } else {
        if (config.headers) {
            config.headers["Content-Type"] = "application/json";
        }
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError<ApiResponse>) => {

        const apiError = error.response?.data;
        const errorMessage = apiError?.message || "An unexpected error occured."

        toast.error(errorMessage);
        return Promise.reject(error);

    }
);

export default api;

