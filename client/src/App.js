import React, {Fragment, useEffect} from 'react';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Routes from "./components/Routing/Routes";
//Redux
import { Provider } from 'react-redux';
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";
import store from "./store";
//Css
import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Switch>
                        <Route component={Routes} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
