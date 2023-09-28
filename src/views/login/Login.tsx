import { observer } from "mobx-react-lite";
import AsyncLengthValidator from "ojs/ojasyncvalidator-length";
import "ojs/ojbutton";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojmessages";
import { useState } from "preact/hooks";
import { LoaderCircle } from "../../common/loader/LoaderCircle";
import { Footer } from "../../components/app-layout/Footer";
import Notification from "../../components/notification/Notification";
import { useStore } from "../../modules/store";
import { useLocation } from "react-router-dom";
import { updateDocumentTitle } from "../../routes/redirection";

const passwordValidator = [
    new AsyncLengthValidator({
        max: 32,
        countBy: "codeUnit",
        hint: { max: "Password can not be more than 32 characters." },
        messageDetail: { tooLong: "Password can not be more than 32 characters." },
    }),
];

export const LoginPage = observer(() => {
    const location = useLocation();
    updateDocumentTitle(location.pathname);

    const SignInHeader = () => {
        return (
            <header className="oj-web-applayout-header">
                <div
                    className="oj-web-applayout oj-flex-bar oj-sm-align-items-center 
                oj-bg-neutral-170 oj-color-invert"
                >
                    <div className="textContainer">
                        <div className="text">
                            <div className="head1">Sign In</div>
                            <div className="head2">Environment Governance & Compliance</div>
                        </div>
                    </div>
                </div>
            </header>
        );
    };

    return (
        <body>
            <div className="oj-web-applayout-page">
                <SignInHeader />
                <CredentialsForm />
                <Notification />
                <Footer />
            </div>
        </body>
    );
});

const CredentialsForm = observer(() => {
    const {
        authStore: { loginUser, loginLoader },
    } = useStore();

    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const signIn = () => {
        void loginUser(userName, password);
    };

    const ssoSignIn = () => {
        console.log("signing in sso");
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onEnter = (event: any) => {
        event.key === "Enter" && signIn();
    };

    const validationHandler = (value: "valid" | "pending" | "invalidHidden" | "invalidShown") => {
        value === "invalidShown" && setUserName("");
    };

    return (
        <div
            className="oj-web-applayout-content oj-flex oj-sm-align-items-center 
        oj-sm-flex-direction-column oj-sm-margin-12x-top"
        >
            <oj-form-layout id="personal-information" direction="column">
                <oj-button
                    onClick={ssoSignIn}
                    class="oj-sm-width-full oj-md-margin-8x-top"
                    chroming="callToAction"
                >
                    Company Single Sign-on
                </oj-button>
                <hr />
                <oj-input-text
                    id="username"
                    label-hint="Username"
                    required={true}
                    spellCheck={false}
                    clearIcon="conditional"
                    translations={{ required: { messageDetail: "Username is required." } }}
                    onvalidChanged={(event) => {
                        validationHandler(event.detail.value);
                    }}
                    onvalueChanged={(event) => {
                        setUserName(event.detail.value);
                    }}
                    value={userName}
                ></oj-input-text>
                <oj-input-password
                    id="password"
                    label-hint="Password"
                    required={true}
                    maskIcon="visible"
                    validators={passwordValidator}
                    translations={{ required: { messageDetail: "Password is required." } }}
                    onrawValueChanged={(event) => {
                        setPassword(event.detail.value);
                    }}
                    onKeyUp={onEnter}
                    value={password}
                ></oj-input-password>
                <oj-button onClick={signIn} class="oj-sm-width-full oj-md-margin-8x-top">
                    Sign In
                </oj-button>
            </oj-form-layout>
            <LoaderCircle isLoading={loginLoader} text="  " styleClasses="oj-sm-margin-12x-top" />
        </div>
    );
});
