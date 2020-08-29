import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import { LoginPage, DashboardPage } from './';
import ProtectedRoute from '../util/ProtectedRoute';

const HomePage = () => {
    return (
        <Router>
            <Fragment>
                <Switch>
                    <Route path='/' exact component={Hero} />
                    <Route path='/login' component={LoginPage} />
                    <ProtectedRoute path='/app'><DashboardPage /></ProtectedRoute>
                </Switch>
            </Fragment>
        </Router>

    )
}

export default HomePage
