import React from "react";
import { ButtonComponent } from "./ButtonComponent";

describe("<ButtonComponent />", () => {
    it("renders", () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<ButtonComponent buttonTitle="test" />);
    });
});
