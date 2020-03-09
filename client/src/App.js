import React, {Fragment} from 'react';
import { GlobalProvider } from './context/GlobalState';
import './App.css'
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Routes from "./components/Routing/Routes";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    // useEffect(() => {
    //     store.dispatch(loadUser());
    // }, []);

  return (
      <GlobalProvider>
          <Router>
              <Fragment>
                  <Switch>
                      <!--<Route exact path='/' component={LandingPage}/>-->
                      <Route component={Routes}/>
                      <Route/>
                  </Switch>
              </Fragment>
          </Router>
      </GlobalProvider>
  );
}

export default App;
