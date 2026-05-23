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
    headers: {
        "Content-Type": "application/json"
    }
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

