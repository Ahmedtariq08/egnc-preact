import { ojMessage } from "@oracle/oraclejet/ojmessage";
import { makeAutoObservable } from "mobx";

export default class CommonStore {
    notifications: ojMessage.Message[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    showNotification = (severity: ojMessage.Message['severity'], summary: string, detail?: string, autoTimeout?: number, timestamp?: string) => {
        this.notifications = [{
            severity: severity,
            summary: summary,
            detail: detail,
            autoTimeout: (severity != "error") ? 5000 : -1,
            timestamp: (timestamp) ? timestamp : new Date().toISOString()
        }];
    }


}