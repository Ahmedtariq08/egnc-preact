import { EnvServices } from "../models/env";

const { Auth, Main, Bom, Export, ThirdPartyAuth } = JSON.parse(process.env.SERVICES!) as EnvServices;

export const URLs = {
    AUTH: {
        USERS: `${Auth}/users`,
        ROLES: `${Auth}/roles`,
    },
    MAIN: {
        ITEM: `${Main}/item`,
        PART_GROUP: `${Main}/partGroup`,
        MANUFACTURER: `${Main}/manufacturer`,
        DECLARATION: `${Main}/declaration`,
    },
    THIRDPARTY_AUTH: {
        SSO: `${ThirdPartyAuth}/sso`,
        CLOUD: `${ThirdPartyAuth}/cloud`,
        AUTHORIZE: `${ThirdPartyAuth}/authorize`,
    },
}