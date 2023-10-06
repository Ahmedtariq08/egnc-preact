import type { EnvServices } from "../models";

const { Auth, Main, ThirdPartyAuth } = JSON.parse(process.env.SERVICES ?? "") as EnvServices;

export const URLs = {
    AUTH: {
        USERS: `${Auth}/users`,
        ROLES: `${Auth}/roles`,
        THIRDPARTY_AUTH: {
            SSO: `${Auth}/${ThirdPartyAuth}/sso`,
            CLOUD: `${Auth}/${ThirdPartyAuth}/cloud`,
            AUTHORIZE: `${Auth}/${ThirdPartyAuth}/authorize`,
        },
    },
    MAIN: {
        ITEM: `${Main}/item`,
        PART_GROUP: `${Main}/partGroup`,
        MANUFACTURER: `${Main}/manufacturer`,
        DECLARATION: `${Main}/declaration`,
        SPECIFICATION: `${Main}/specification`,
        PREFERENCE: `${Main}/preference`,
        REPORT: `${Main}/report`,
        ATTACHMENT: `${Main}/attachments`,
    },
};
