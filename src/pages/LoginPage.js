import React, { Fragment } from 'react';
import LoginForm from '../components/Login/LoginForm';
import HomePageNavBar from '../components/NavBar/HomePageNavBar';

const LoginPage = () => {
    return (
        <Fragment>
            <HomePageNavBar />
            <section className='login'>
                <LoginForm />
            </section>
        </Fragment>
    )
}

export default LoginPage
