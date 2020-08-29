import React, { Fragment } from 'react';
import LoginGoogle from '../components/Login/LoginGoogle';
import HomePageNavBar from '../components/NavBar/HomePageNavBar';

const LoginPage = () => {
    return (
        <Fragment>
            <HomePageNavBar />
            <LoginGoogle />
        </Fragment>
    )
}

export default LoginPage
