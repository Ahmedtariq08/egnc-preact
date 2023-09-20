import { EnvServices } from "../models/env";

const { Auth, Main, Bom, Export } = JSON.parse(process.env.SERVICES!) as EnvServices;

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
    }
}