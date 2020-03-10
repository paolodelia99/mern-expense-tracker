import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from "./components/Routing/Routes";
import Login from "./components/Auth/Login";
//Redux
import { Provider } from 'react-redux';
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";
import store from "./store";
//Css
import './App.css';

const App = () => {
    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
            store.dispatch(loadUser());
        }
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route component={Routes} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
