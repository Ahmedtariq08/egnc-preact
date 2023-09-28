import { customElement, type GlobalProps } from "ojs/ojvcomponent";
import { Component, type ComponentChild } from "preact";
import { RouterProvider } from "react-router-dom";
import "./app.css";
import "react-loading-skeleton/dist/skeleton.css";
import { store, StoreContext } from "./modules/store";
import { router } from "./routes/Router";
import Context = require("ojs/ojcontext");

@customElement("app-root")
export default class App extends Component<GlobalProps> {
    render(): ComponentChild {
        return (
            <StoreContext.Provider value={store}>
                <RouterProvider router={router} />
            </StoreContext.Provider>
        );
    }

    componentDidMount() {
        Context.getPageContext().getBusyContext().applicationBootstrapComplete();
    }
}
