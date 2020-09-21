import React, { Fragment } from 'react';
import RegisterForm from '../components/Register/RegisterForm';
import HomePageNavBar from '../components/NavBar/HomePageNavBar';
import api from '../components/Api';

const RegisterPage = () => {

    const handleRegisterUser = async payload => {
        try {
            await api.registerUser(payload)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <Fragment>
            <HomePageNavBar />
            <section className='register'>
                <RegisterForm handleRegisterUser={handleRegisterUser} />
            </section>
        </Fragment>
    )
}

export default RegisterPage
