import { ojMessage } from "@oracle/oraclejet/ojmessage";
import { AxiosError } from "axios";

export interface ApiResponse<T> {
    isSuccess: boolean,
    error: AxiosError,
    data: T,
    message: ojMessage.Message
}