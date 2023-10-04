import { requests, URLs } from "../../api";
import { dateFormatter } from "../../utils/dateUtils";
import { type Report } from "./reportModels";

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

// export const getReports = async (): Promise<Report[]> => {
//     let url = Config.EGNC_backend + reportBase.base + `/${getUserId()}`;
//     let reports: Report[] = await RestUtils.get(url);
//     return reports;
// };
