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
        (tolerance: number) => requests.put<number>(`${prefernceUrl}/thresholdTolerance`, { value: tolerance }),

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
const successMessage = (value: string): string => {
    return `${value} updated successfully.`
}

const errorMessage = (value: string): string => {
    return `Unable to update ${value}`
}

export const substancePreventionSuccessMessage = (value: YesNo): string => {
    const placeholder = value === "yes" ? "will" : "will not";
    return `Declaration submission ${placeholder} be prevented on unknown substance presence.`
}

export const MessageMap: { [K in keyof ConfigData]: { successMsg: string, errorMsg: string }; } = {
    cloud: {
        successMsg: successMessage('Cloud Link'),
        errorMsg: errorMessage('Cloud Link')
    },
    thresholdTolerance: {
        successMsg: successMessage('Threshold Tolerance'),
        errorMsg: errorMessage('Threshold Tolerance')
    },
    company: {
        successMsg: successMessage('Company name'),
        errorMsg: errorMessage('Company name')
    },
    followUpDays: {
        successMsg: successMessage('Follow up days'),
        errorMsg: errorMessage('Follow up days')
    },
    substancePrevention: {
        successMsg: successMessage('Unknown substance severity prevention'), //Not to use this
        errorMsg: errorMessage('Unknown substance severity prevention')
    },
}
