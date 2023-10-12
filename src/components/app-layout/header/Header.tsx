import { observer } from "mobx-react-lite";
import "ojs/ojbutton";
import "ojs/ojmenu";
import "ojs/ojnavigationlist";
import "ojs/ojoption";
import "ojs/ojtoolbar";
import { Link } from "react-router-dom";
import { ButtonComponent } from "../../../common/button/ButtonComponent";
import { Icons } from "../../../constants/iconsData";
import { useStore } from "../../../modules/store";
import { Pages, getRedirectionPath } from "../../../routes/redirection";
import { HeaderToolbar } from "./HeaderToolbar";

export const Header = observer(() => {
    const { layoutStore } = useStore();

    return (
        <header
            role="banner"
            className="oj-web-applayout-header oj-applayout-fixed-top oj-bg-neutral-170 
            oj-color-invert oj-sm-padding-2x-vertical"
        >
            <div className="oj-flex-bar oj-sm-align-items-center">
                <div className="oj-flex-bar-middle oj-sm-align-items-center">
                    <ButtonComponent
                        buttonTitle="Drawer"
                        icon={Icons.icons.drawer}
                        ojAction={layoutStore.toggleDrawer}
                        styleClass="oj-button-outlined-chrome"
                    />
                    <div className="oj-sm-padding-4x-horizontal oj-sm-margin-4x-start">
                        <Link to={getRedirectionPath(Pages.Dashboard)}>
                            <span role="img" className="leaf-icon">
                                {" "}
                            </span>
                        </Link>
                    </div>
                    <h1
                        className="oj-sm-only-hide oj-web-applayout-header-title oj-color-invert"
                        title="Application Name"
                    >
                        <span className="space">Environment Governance &amp; Compliance</span>
                    </h1>
                </div>
                <div className="oj-flex-bar-end">
                    <HeaderToolbar />
                </div>
            </div>
        </header>
    );
});
