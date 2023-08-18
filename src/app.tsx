import { customElement, GlobalProps } from 'ojs/ojvcomponent';
import { Component, ComponentChild } from 'preact';
import Context = require('ojs/ojcontext');
import "./app.css";
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router';
import { StoreContext, store } from './stores/store';


@customElement('app-root')
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


