import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions';
import { base_host } from '../../routes'

class LoginPage extends Component {
    componentWillMount() {
        console.log('rendering login page');
    }
    
    render() {
        return (
            <div>
                <h5>Please Login to use Logtre.</h5>
                <a href='auth/facebook'>Login Facebook with link</a>
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