import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import api from '../Api';


class LoginGoogle extends Component {

    responseSuccessGoogle = response => {
        console.log(response);
        api.googleLogin(response);
    };

    responseFailureGoogle = response => {
        console.log(response)
    }

    render() {
        return (
            <div className='loginGoogle-div'>
                <GoogleLogin
                    clientId="443830178449-c1j7calc64mtia51msdfv1gmguu2rj4p.apps.googleusercontent.com"
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