import "ojs/ojbutton";
import "ojs/ojmenu";
import "ojs/ojnavigationlist";
import "ojs/ojtoolbar";
import "ojs/ojoption"
import { useState } from "preact/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import ArrayDataProvider = require("ojs/ojarraydataprovider");


export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedPage, setSelectedPage] = useState(location.pathname);



  const signOut = () => {
    //signout
  }

  return (
    <header role="banner" class="oj-web-applayout-header oj-applayout-fixed-top oj-bg-neutral-170 oj-color-invert">
      <div class="oj-flex-bar oj-sm-align-items-center">
        <div class="oj-flex-bar-middle oj-sm-align-items-baseline">
          <span
            role="img"
            class="oj-icon gosaas-icon"
            title="GoSaaS"
            alt="GoSaaS Logo"></span>

          <h1
            class="oj-sm-only-hide oj-web-applayout-header-title oj-typography-heading-xs oj-bg-neutral-170 oj-color-invert"
            title="Environment and Government Compliance">
            {"Environment and Government Compliance"}
          </h1>
        </div>
        <div class="oj-flex-bar-end">
          <oj-toolbar>
            <oj-menu-button id="userMenu" chroming="borderless">
              <span>{"Ahmed tariq"}</span>
              <oj-menu id="menu1" slot="menu">
                <oj-option onClick={signOut}>Sign Out</oj-option>
              </oj-menu>
            </oj-menu-button>
          </oj-toolbar>
        </div>
      </div>
    </header>
  );
}
