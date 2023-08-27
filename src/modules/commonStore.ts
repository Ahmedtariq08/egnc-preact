import { ojMessage } from "@oracle/oraclejet/ojmessage";
import { makeAutoObservable } from "mobx";
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

export default class CommonStore {
    notifications: MutableArrayDataProvider<string, ojMessage.Message> = new MutableArrayDataProvider<string, ojMessage.Message>([], { keyAttributes: 'id' });

    constructor() {
        makeAutoObservable(this);
    }

    showNotification = (severity: ojMessage.Message['severity'], summary: string, detail?: string, autoTimeout?: number, timestamp?: string) => {
        this.notifications.data = [{
            severity: severity,
            summary: summary,
            detail: detail,
            autoTimeout: (severity != "error") ? 5000 : -1,
            timestamp: (timestamp) ? timestamp : new Date().toISOString()
        }];
    }

    clearNotifications = () => {
        this.notifications.data = [];
    }

}