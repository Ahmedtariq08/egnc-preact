/* Contains all types / Interfaces / Constants related to reports page */
import { Icons } from "../../constants";
import { type OjOption } from "../../models";

// ANCHOR - Interfaces
export interface Report {
    id: number;
    fileName: string;
    createdDate: string;
    uuid: string;
    status?: "downloading" | "deleting";
}

/**
 * @field generateReport: function should have as any arguements as fields plus guuid as last arguement,
 *  every value selected in the field will be sent as arguemnt, sequentially
 */
export interface ReportToBeGenerated {
    title: string;
    icon: string;
    fields: Field[];
    generateReport?: (...args: unknown[]) => Promise<Report>;
}

/**
 * @title unique identifier
 * @value  empty string if selection is single, array if selection is multiple
 * @dependsOn title of the field it depends on, will fetch value and send in getOptions params
 */
export interface Field {
    title: string;
    label: string;
    value: string | number | string[] | number[];
    selection: "single" | "multiple";
    getOptions: (value?: string | number | string[] | number[] | OjOption) => Promise<OjOption[]>;
    dependsOn?: string;
}

// ANCHOR - Configuration of specific reports
const SVHC_REPORT: ReportToBeGenerated = {
    title: "Specification Substance Report",
    icon: Icons.icons.specification,
    fields: [
        {
            title: "Specification",
            label: "Select a Specification",
            value: "",
            selection: "single",
            getOptions: reportService.getNonParentSpecification,
        },
        {
            title: "Substance",
            label: "Select one or more Substances",
            value: [],
            selection: "multiple",
            getOptions: reportService.getSubstanceOfSpecification,
            dependsOn: "Specification",
        },
    ],
    generateReport: reportService.generateSpecificationSubstanceReport,
};

export const allReports: ReportToBeGenerated[] = [SVHC_REPORT];
