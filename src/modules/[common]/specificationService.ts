/* eslint-disable @typescript-eslint/naming-convention */
import { requests, URLs } from "../../api";
import { type SpecificationExtended, type Specification, type Substance } from "../../models";

const specUrl = URLs.MAIN.SPECIFICATION;
export const specificationApi = {
    getSpecifications: async (wfid?: number) =>
        await requests.get<Specification[]>(`${specUrl}/`, { params: { wfid } }),

    getEnabledOnlySpecifications: async (wfid?: number) =>
        await requests.get<Specification[]>(`${specUrl}/`, { params: { enabledOnly: true, wfid } }),

    getSpecification: async (specId: number) =>
        await requests.get<SpecificationExtended>(`${specUrl}/${specId}`),

    getSpecificationSubstances: async (
        specId: number,
        params?: { substanceName: string; casNumber: string; isGroup: boolean; format: string },
    ) => await requests.get<Substance[]>(`${specUrl}/${specId}`, { params }),
};
