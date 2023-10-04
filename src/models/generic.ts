/* Generic types / interfaces used across apps */
import { type ojMessage } from "@oracle/oraclejet/ojmessage";

export interface EnvServices {
    Auth: string;
    Main: string;
    Bom: string;
    Export: string;
    ThirdPartyAuth: string;
}

export interface OjOption {
    value: unknown;
    label: string;
}

export class Response {
    data: unknown;
    error: unknown;
    message: ojMessage.Message | undefined;
}
