import { makeAutoObservable, runInAction } from "mobx";
import { isValidString } from "../../utils";
import { store } from "../store";
import { allReports, type Field, type Report, type ReportToBeGenerated } from "./reportModels";
import { reportProgressUrl, valueIsValid } from "./reportService";

export default class ReportStore {
    // Generate Report
    selectedReport: ReportToBeGenerated | undefined = undefined;
    reportFields: Field[] = [];
    progress: number | undefined = undefined;
    disableGenerate = false;
    filename = "";

    // Reports Table
    reports: Report[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reportSelectionHandler = (event: any) => {
        const report: ReportToBeGenerated = event.detail.value;
        if (report) {
            this.selectedReport = report;
            const reportObj = allReports.find((report) => report.title === this.selectedReport?.title);
            if (reportObj) {
                this.reportFields = reportObj.fields;
            }
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filenameHandler = (event: any) => {
        this.filename = event.detail.value;
    };

    generateClick = () => {
        // Perform validations
        if (this.selectedReport) {
            const firstInvalidField = this.reportFields.find((field) => !valueIsValid(field.value));
            if (firstInvalidField) {
                store.commonStore.showNotification(
                    "warning",
                    `Please select a value for ${firstInvalidField.title}`,
                );
            } else {
                if (this.isNotValidFilename()) {
                    store.commonStore.showNotification(
                        "warning",
                        !isValidString(this.filename)
                            ? "Please enter a file name."
                            : "Please select a unique file name.",
                    );
                } else {
                    // now generate report
                    const reportObj = allReports.find(
                        (report) => report.title === this.selectedReport?.title,
                    );
                    const sequencedValues = this.reportFields.map((field) => {
                        return field.value;
                    });
                    if (reportObj) {
                        this.generateReportWithProgress(reportObj, sequencedValues);
                    }
                }
            }
        } else {
            store.commonStore.showNotification("warning", "Please select a Report type");
        }
    };

    private readonly generateReportWithProgress = (
        reportObj: ReportToBeGenerated,
        sequencedValues: Array<string | number | string[] | number[]>,
    ) => {
        const eventSource = new EventSource(reportProgressUrl, { withCredentials: true });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let guidValue: any;

        eventSource.addEventListener("GUI_ID", (event) => {
            guidValue = JSON.parse(event.data);
            eventSource.addEventListener(guidValue, (event) => {
                const progress = JSON.parse(event.data);
                this.progress = Math.round(progress);
            });
            void uploadReport();
        });

        const uploadReport = async () => {
            this.disableGenerate = true;
            this.progress = 0;
            try {
                if (reportObj.generateReport) {
                    const response: Report = await reportObj.generateReport(
                        ...sequencedValues,
                        guidValue,
                        this.filename,
                    );
                    if (response.id != null) {
                        store.commonStore.showNotification("confirmation", "Report generated successfully.");
                        runInAction(() => {
                            this.reports.push(response);
                        });
                    }
                } else {
                    console.error("Generate report function not defined for particular report");
                }
            } catch (error) {
                store.commonStore.showNotification("error", "Error in generating report.");
            } finally {
                runInAction(() => {
                    this.disableGenerate = false;
                    this.progress = undefined;
                    this.filename = "";
                });
            }
        };

        eventSource.onerror = (event) => {
            if (event.eventPhase === EventSource.CLOSED) {
                eventSource.close();
            }
        };
    };

    private readonly isNotValidFilename = () => {
        const allFilenamesTaken = this.reports.map((report) => report.fileName);
        return allFilenamesTaken.includes(this.filename) || !isValidString(this.filename);
    };
}
