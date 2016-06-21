import React, { Component } from 'react'

export default class LoginPage extends Component {
    render() {
        console.log(this.props.authWithFacebook)
        return (
            <div>
                <h5>Please Login to use Logtre.</h5>
                <button type="button" onClick={this.props.authWithFacebook()}>
                    Login with Facebook
                </button>
                <a href="http://local.logtre.com/auth/facebook">Login Facebook with link</a>
            </div>
        )
    }
}