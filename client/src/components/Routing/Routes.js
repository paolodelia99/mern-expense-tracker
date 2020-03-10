import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import Alert from "../Layout/Alert";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../Layout/NotFound";
import DashBoard from "../DashBoard";
const Routes = () => {
    return (
        <section className='container'>
            <Alert/>
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/' component={Login} />
                <PrivateRoute exact path='/dashboard' component={DashBoard} />
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};

export default Routes;