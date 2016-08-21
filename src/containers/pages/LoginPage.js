import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions';
import { base_host } from '../../routes';
import RaisedButton from 'material-ui/RaisedButton';
import { commonStyle } from '../../config';

const LoginBtnSytle = {
    "padding": "3px 6px",
    "margin": "20px auto",
    "color": "white"
}

const LoginBtnLabelStyle = {
    "padding": "0 5px",
    "color": "#fff"
}

class LoginPage extends Component {
    componentWillMount() {
        console.log('rendering login page');
    }
    
    render() {
        return (
            <div>
                <a href="auth/facebook">
                <RaisedButton backgroundColor={commonStyle.primaryColor}
                              labelColor="#fff"
                              labelStyle={LoginBtnLabelStyle}
                              style={LoginBtnSytle}>
                    <span style={{"color": "white", "display":"inline-block","margin":"0 5px"}}>SignUp with Facebook</span>
                </RaisedButton>
                </a>
            </div>
        )
    }
}

function mapStateToPorps(state) {
    return {
        isAuthenticated: state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(LoginPage)