import { requests, URLs } from "../../../api";

//ANCHOR - Intefaces
export interface SSO {
    id: number;
    clientId: string;
    clientSecret: string;
    tokenUri: string;
    scope: string[];
    authorizationUri: string;
    redirectUri: string;
    userInfoUri: string;
    issuerUri: string;
    jwkUri: string;
    providerName: string;
};

export const ScopeMapping = [
    { label: "Open Id", value: "openid" },
    { label: "Profile", value: "profile" },
    { label: "Email", value: "email" },
    { label: "Offline Access", value: "offline_access" }
];

//ANCHOR - APIs
const { SSO: ssoURL } = URLs.THIRDPARTY_AUTH;

export const SSOApis = {
    getSSO: () => requests.get<SSO>(ssoURL),
    updateSSO: (sso: SSO) => requests.put<string>(ssoURL, sso)
}