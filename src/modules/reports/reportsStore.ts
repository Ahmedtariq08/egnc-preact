import { makeAutoObservable } from "mobx";
import { type Report } from "./reportModels";

export default class ReportStore {
    reports: Report[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}
