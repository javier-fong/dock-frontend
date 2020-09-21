import React, { Fragment } from 'react';
import RegisterForm from '../components/Register/RegisterForm';
import HomePageNavBar from '../components/NavBar/HomePageNavBar';

const RegisterPage = () => {
    return (
        <Fragment>
            <HomePageNavBar />
            <section className='register'>
                <RegisterForm />
            </section>
        </Fragment>
    )
}

export default RegisterPage
