import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { BlockHeader } from "../../../components/block-layout/BlockHeader";
import { useAdminPanelStore } from "../../../modules/admin-panel/adminPanelStore";
import { METADATA, type SSO, ScopeMapping, type TRow } from "../../../modules/admin-panel/sso/ssoService";
import "ojs/ojselectcombobox";
import "ojs/ojinputtext";

export const SSOTab = observer(() => {
    const {
        ssoStore: {
            sso,
            loadingSso,
            editDisabled,
            loadSso,
            editAction,
            resetAction,
            updateSso,
            valueChangeHandler,
        },
    } = useAdminPanelStore();

    useEffect(() => {
        void loadSso();
    }, [loadSso]);

    const Element = (props: { properties: TRow; value: string | string[] | undefined }) => {
        const { title, key } = props.properties;
        const { value } = props;
        return (
            <div className="oj-sm-padding-8x-top">
                <div className="oj-sm-padding-2x-bottom">
                    <b>{title}</b>
                </div>
                {Array.isArray(value) && key === METADATA.SCOPE.key ? (
                    <oj-select-many
                        value={value}
                        disabled={editDisabled}
                        options={ScopeMapping}
                        onvalueChanged={(event) => {
                            valueChangeHandler(event, key as keyof SSO);
                        }}
                        class="oj-md-10"
                    />
                ) : (
                    <oj-input-text
                        disabled={editDisabled}
                        spellcheck={false}
                        value={value}
                        onvalueChanged={(event) => {
                            valueChangeHandler(event, key as keyof SSO);
                        }}
                        class="oj-md-10"
                    />
                )}
            </div>
        );
    };

    return (
        <div className="oj-sm-margin-2x">
            <BlockHeader
                headerTitle={"Single Sign-On"}
                loader={{ isLoading: loadingSso, text: "Saving ..." }}
                saveAction={updateSso}
                editAction={editAction}
                resetAction={resetAction}
            />
            <div className="oj-panel">
                <div className="oj-flex oj-sm-flex-direction-row">
                    <div className="oj-flex-item oj-sm-flex-direction-column oj-sm-padding-4x-horizontal">
                        <Element properties={METADATA.CLIENT_ID} value={sso?.clientId} />
                        <Element properties={METADATA.TOKEN_URI} value={sso?.tokenUri} />
                        <Element properties={METADATA.USERINFO_URI} value={sso?.userInfoUri} />
                        <Element properties={METADATA.JWK_URI} value={sso?.jwkUri} />
                        <Element properties={METADATA.SCOPE} value={sso?.scope} />
                    </div>
                    <div className="oj-flex-item oj-sm-flex-direction-column">
                        <Element properties={METADATA.CLIENT_SECRET} value={sso?.clientSecret} />
                        <Element properties={METADATA.AUTH_URI} value={sso?.authorizationUri} />
                        <Element properties={METADATA.ISSUER_URI} value={sso?.issuerUri} />
                        <Element properties={METADATA.PROVIDER} value={sso?.providerName} />
                    </div>
                </div>
            </div>
        </div>
    );
});
