/* eslint-disable @typescript-eslint/naming-convention */
import { requests, URLs } from "../../api";
import { dateFormatter } from "../../utils/dateUtils";
import { downloadAttachment } from "../[common]/attachmentService";
import { getUserId } from "../auth/authService";
import { type Report } from "./reportModels";
import { type OjOption, type Response } from "../../models";
import { specificationApi } from "../[common]/specificationService";

export const SELECT_ALL_SUBSTANCE = { value: 8031998, label: "*All Substances*" };

// ANCHOR - APIs
const reportUrl = URLs.MAIN.REPORT;
export const reportApis = {
    getAllReports: async (userId: number) => await requests.get<Report[]>(`${reportUrl}/${userId}`),

    deleteReports: async (reportIds: number[]) =>
        await requests.del<string>(`${reportUrl}`, { data: reportIds }),

    generateSpecSubstanceReport: async (
        specId: number | string,
        guid: string,
        substanceIds: number[],
        userId: number,
        fileName?: string,
    ) =>
        await requests.post<Report>(`${reportUrl}/specSubstanceWhereUsed/${specId}?guid=${guid}`, {
            substanceIds,
            report: { userId, fileName: fileName ?? null },
        }),
};

// ANCHOR - Common Functions
export const formatReports = (reports: Report[]) => {
    const mappedReports: Report[] = reports.map((report) => {
        const { createdDate, ...fields } = report;
        return { ...fields, createdDate: dateFormatter(createdDate) ?? "" };
    });
    return mappedReports;
};

export const getAllReports = async (): Promise<Report[]> => {
    const userId = getUserId();
    return userId ? await reportApis.getAllReports(userId) : [];
};

export const deleteReports = async (reportIds: number[]): Promise<string> => {
    return await reportApis.deleteReports(reportIds);
};

export const downloadReport = async (reportUUID: string): Promise<Response> => {
    return await downloadAttachment(reportUUID);
};

// ANCHOR - Specification Substance report functions
export const generateSpecificationSubstanceReport = async (
    specification: OjOption,
    substanceIds: number[],
    guid: string,
    fileName: string,
): Promise<Report> => {
    const specId = specification.value as number;
    const subIds = substanceIds.includes(SELECT_ALL_SUBSTANCE.value) ? [] : substanceIds;
    const userId = getUserId();
    return await reportApis.generateSpecSubstanceReport(specId, guid, subIds, userId!, fileName);
};

// SECTION - Get specifications
interface TreeSpec {
    label: string;
    value: { value: number; label: string };
    validationType: string;
}

/**
 * @returns Specifications in tree format, divided by homogenous and part level
 */
export const getNonParentSpecification = async (wfid?: number): Promise<OjOption[]> => {
    let specifications: OjOption[] = [];
    try {
        // Get parent specifications and are enabled
        const specificaionMap = new Map<number, TreeSpec>();
        const specs = await specificationApi.getEnabledOnlySpecifications(wfid);
        specs.forEach((spec) => {
            const { specification_id, specification_name, validation_type, parent } = spec;
            if (!specificaionMap.get(specification_id) && !parent) {
                specificaionMap.set(specification_id, {
                    label: specification_name,
                    value: { value: specification_id, label: specification_name },
                    validationType: validation_type,
                });
            }
        });
        // Process specs to create tree data with different validation types
        const result: Record<string, TreeSpec[]> = {};
        const options = [...specificaionMap.values()];

        options.forEach((spec) => {
            const { validationType } = spec;
            if (!result[validationType]) {
                result[validationType] = [];
            }
            result[validationType].push(spec);
        });

        specifications = Object.entries(result).map(([key, value]) => ({
            value: key,
            label: key,
            children: value,
        }));

        // return new ArrayTreeDataProvider(specifications, {
        //     keyAttributes: "value",
        //     childrenAttribute: "children",
        //     textFilterAttributes: ["label"],
        // });
    } catch (error) {}
    // const specifications = [...specificaionMap.values()];
    return specifications;
};

// SECTION - Get substances of specification
export const getSubstanceOfSpecification = async (specification: OjOption): Promise<OjOption[]> => {
    let options: OjOption[] = [];
    try {
        const response = await specificationApi.getSpecificationSubstances(specification.value as number);
        if (response && Array.isArray(response)) {
            options = response.map((sub) => {
                return { value: sub.substanceId, label: sub.substanceName };
            });
        }
        if (options.length > 4) {
            options.unshift(SELECT_ALL_SUBSTANCE);
        }
    } catch (error) {}
    return options;
    // return new ArrayDataProvider(options, { keyAttributes: "value" });
};
