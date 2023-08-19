import "ojs/ojbutton";
import "ojs/ojmenu";
import "ojs/ojnavigationlist";
import "ojs/ojtoolbar";
import "ojs/ojoption"
import { useState } from "preact/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { observer } from "mobx-react-lite";
import { useStore } from "../../../modules/store";
import { ButtonComponent } from "../../../common/button/ButtonComponent";
import { Icons } from "../../../constants/iconsData";
import { NavigateTo } from "../../../routes/Router";


export const Header = observer(() => {
  const { authStore, commonStore } = useStore();
  const { userPemissions } = authStore;



  const signOut = () => {
    //signout
  }

  return (
    <header role="banner" class="oj-web-applayout-header oj-applayout-fixed-top oj-bg-neutral-170 oj-color-invert oj-sm-padding-2x-vertical">
      <div class="oj-flex-bar oj-sm-align-items-center">
        <div class="oj-flex-bar-middle oj-sm-align-items-center">
          <ButtonComponent buttonTitle="Drawer" icon={Icons.icons.drawer} ojAction={commonStore.toggleDrawer} styleClass="oj-button-outlined-chrome" />
          <div className="oj-sm-padding-4x-horizontal oj-sm-margin-4x-start">
            <Link to={NavigateTo.Dashboard}>
              <span role="img" class="leaf-icon"> </span>
            </Link>
          </div>
          <h1 class="oj-sm-only-hide oj-web-applayout-header-title oj-color-invert" title="Application Name">
            <span class="space">Environment Governance &amp; Compliance</span>
          </h1>


          {/* <span
            role="img"
            class="oj-icon gosaas-icon"
            title="GoSaaS"
            alt="GoSaaS Logo"></span>

          <h1
            class="oj-sm-only-hide oj-web-applayout-header-title oj-typography-heading-xs oj-bg-neutral-170 oj-color-invert"
            title="Environment and Government Compliance">
            {"Environment and Government Compliance"}
          </h1> */}
        </div>
        <div class="oj-flex-bar-end">
          <oj-toolbar>
            <oj-menu-button id="userMenu" chroming="borderless">
              <span>{userPemissions?.username}</span>
              <oj-menu id="menu1" slot="menu">
                <oj-option onClick={signOut}>Sign Out</oj-option>
              </oj-menu>
            </oj-menu-button>
          </oj-toolbar>
        </div>
      </div>
    </header>
  );
})
