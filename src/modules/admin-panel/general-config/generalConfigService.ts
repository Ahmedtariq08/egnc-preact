import { requests, URLs } from "../../../api";

//ANCHOR - Interfaces
export interface Cloud {
    id: number;
    authorizationUri: string;
    validationUri: string;
}

export type SeverityPrevention = 'MAJOR' | 'MINOR';
export type YesNo = "yes" | "no"
const severityMap = new Map<string, YesNo>([["MAJOR", "yes"], ["MINOR", "no"]]);

type Data<T> = {
    value: T | undefined;
    prev: T | undefined;
    loading: boolean;
    disabled: boolean;
};

const createInitialData = <T>(value: T | undefined): Data<T> => ({
    value,
    prev: value,
    loading: false,
    disabled: true
});

export type ConfigData = {
    cloud: Data<Cloud>,
    thresholdTolerance: Data<number>,
    substancePrevention: Data<YesNo>,
    company: Data<string>,
    followUpDays: Data<number>,
}

//Store intialized with this data
export const intialConfigData: ConfigData = {
    cloud: createInitialData<Cloud>(undefined),
    thresholdTolerance: createInitialData<number>(undefined),
    substancePrevention: createInitialData<YesNo>(undefined),
    company: createInitialData<string>(undefined),
    followUpDays: createInitialData<number>(undefined),
}


//ANCHOR - APIs
const { CLOUD: cloudURL } = URLs.AUTH.THIRDPARTY_AUTH;
const { PREFERENCE: prefernceUrl } = URLs.MAIN;

export const generalConfigApis = {
    getOracleCloudLink: () => requests.get<Cloud>(cloudURL),
    updateOracleCloudLink: (cloud: Cloud) => requests.put<boolean>(cloudURL, cloud),

    getThresholdTolerance: () => requests.get<number>(`${prefernceUrl}/thresholdTolerance`),
    updateThresholdTolerance:
        (tolerance: number) => requests.put<number>(`${prefernceUrl}/thresholdTolerance`, tolerance),

    getUnknownSubstanceSeverityPrevention:
        () => requests.get<SeverityPrevention>(`${prefernceUrl}/UnknownSubstanceSeverity`)
            .then((response) => { return severityMap.get(response); }),
    updateUnknownSubstanceSeverityPrevention:
        (prevent: YesNo) => requests.put<YesNo>(`${prefernceUrl}/UnknownSubstanceSeverity`, { value: prevent }),

    getCompanyName: () => requests.get<string>(`${prefernceUrl}/companyName`),
    updateCompanyName: (company: string) => requests.put<string>(`${prefernceUrl}/companyName`, { value: company }),

    getFollowUpDays: () => requests.get<number>(`${prefernceUrl}/followUpDays`),
    updateFollowUpDays: (followUp: number) => requests.put<number>(`${prefernceUrl}/followUpDays`, { value: followUp }),
}


//ANCHOR - Utility functions
export const successMessage = (value: string): string => {
    return `${value} updated successfully.`
}
export const errorMessage = (value: string): string => {
    return `Unable to update ${value}`
}
export const substancePreventionSuccessMessage = (value: YesNo): string => {
    const placeholder = value === "yes" ? "will" : "will not";
    return `Declaration submission ${placeholder} be prevented on unknown substance presence.`
}

