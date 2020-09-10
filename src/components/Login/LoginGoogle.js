import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import api from '../Api';

class LoginGoogle extends Component {

    responseSuccessGoogle = async response => {
        console.log(response);
        try {
            await api.googleLogin(response);
        } catch(err) {
            console.log(err);
        }
    };

    responseFailureGoogle = response => {
        console.log(response)
    }

    render() {
        return (
            <div className='loginGoogle-div'>
                <GoogleLogin
                    clientId="443830178449-cbino10bf0idg4tjgse0povb8tdok0a4.apps.googleusercontent.com"
                    render={renderProps => (
                        <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}> </GoogleButton>
                    )}
                    buttonText="Login"
                    onSuccess={this.responseSuccessGoogle}
                    onFailure={this.responseFailureGoogle}
                    cookiePolicy={'single_host_origin'}
                    className='loginGoogle'
                />
            </div>
        )
    }
}

export default LoginGoogle