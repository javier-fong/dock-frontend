import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import { LoginPage, RegisterPage, DashboardPage } from './';
import ProtectedRoute from '../util/ProtectedRoute';

const HomePage = () => {
    return (
        <Router>
            <Fragment>
                <Switch>
                    <Route path='/' exact component={Hero} />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/register' component={RegisterPage} />
                    <ProtectedRoute path='/app'><DashboardPage /></ProtectedRoute>
                </Switch>
            </Fragment>
        </Router>

    )
}

export default HomePage
