import { observer } from "mobx-react-lite";
import { useEffect } from 'react'
import "ojs/ojbutton";
import 'ojs/ojformlayout';
import "ojs/ojinputtext";
import 'ojs/ojlabel';
import "ojs/ojmessages";
import { LoaderCircle } from '../../common/loader/LoaderCircle';
import { Footer } from "../../components/app-layout/Footer";
import { useStore } from "../../modules/store";

export const LandingPage = observer(() => {
    const { authStore: { appLoader, checkSignedIn } } = useStore();

    useEffect(() => {
        checkSignedIn();
    }, [checkSignedIn])

    const LandingHeader = () => {
        return (
            <header class="oj-web-applayout-header">
                <div class="oj-web-applayout oj-flex-bar oj-sm-align-items-center oj-bg-neutral-170 oj-color-invert">
                    <div class="textContainer">
                        <div class="text">
                            <div class="head1"></div>
                            <div class="head2">Environment Governance & Compliance</div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <body >
            <div class="oj-web-applayout-page">
                <LandingHeader />
                <div className="oj-flex oj-sm-align-items-center oj-sm-justify-content-center">
                    <LoaderCircle isLoading={appLoader} text="Loading ..." />
                </div>
                <Footer />
            </div>
        </body>
    );
})