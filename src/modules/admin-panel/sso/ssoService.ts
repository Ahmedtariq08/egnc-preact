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

export type TRow = { title: string, key: string }

/**
 * @desc Component metadata for rows, key must be a key in sso interface
 */
export const METADATA = {
    CLIENT_ID: { title: "Client Id", key: "clientId" },
    CLIENT_SECRET: { title: "Client Secret", key: "clientSecret" },
    TOKEN_URI: { title: "Token URI", key: "tokenUri" },
    AUTH_URI: { title: "Authorization URI", key: "authorizationUri" },
    USERINFO_URI: { title: "User Information URI", key: "userInfoUri" },
    ISSUER_URI: { title: "Issuer URI", key: "issuerUri" },
    JWK_URI: { title: "Jwk URI", key: "jwkUri" },
    PROVIDER: { title: "Provider", key: "providerName" },
    SCOPE: { title: "Scope", key: "scope" },
}


//ANCHOR - APIs
const { SSO: ssoURL } = URLs.AUTH.THIRDPARTY_AUTH;

export const SSOApis = {
    getSSO: () => requests.get<SSO>(ssoURL),
    updateSSO: (sso: SSO) => requests.put<string>(ssoURL, sso)
}