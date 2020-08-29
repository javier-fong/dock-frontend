import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import Axios from 'axios';

const api = Axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000'
})

class LoginGoogle extends Component {

    responseSuccessGoogle = response => {
        console.log(response)

        api.post('/googlelogin', {
            tokenId: response.tokenId
        }).then(response => {
            console.log('Google login success', response);
            localStorage.setItem('login', JSON.stringify(response.data.user));
            window.location.href = '/app/dashboard';
            console.log(response.data)
        }).catch(err => {
            console.log(err);
        })
    };

    responseFailureGoogle = response => {
        console.log(response)
    }

    render() {
        return (
            <section className='login'>
                <div className='layer'></div>
                <div className='login-div'>
                    <GoogleLogin
                        clientId="443830178449-c1j7calc64mtia51msdfv1gmguu2rj4p.apps.googleusercontent.com"
                        render={renderProps => (
                            <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}> </GoogleButton>
                        )}
                        buttonText="Login"
                        onSuccess={this.responseSuccessGoogle}
                        onFailure={this.responseFailureGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </section>
        )
    }
}

export default LoginGoogle