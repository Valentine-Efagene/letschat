import { AxiosError } from "axios";

export class ErrorHelper {
    public static simplifyAxiosError(error: AxiosError) {
        return {
            statusCode: error.response?.status, statusText: error.response?.statusText,
            data: error?.response?.data
        }
    }
}