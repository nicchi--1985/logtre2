import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookie';
import * as Actions from '../actions/actions';

class UserOnly extends Component {
    componentWillMount() {
        console.log("user will mount");
        console.log(this.props.isAuthenticated);
        console.log(this.props);
        this.checkAuth(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        console.log("user will receive props");
        this.checkAuth(nextProps);
    }
    
    checkAuth(props) {
        if (!props.isAuthenticated && cookie.load('token')) {
            console.log('dispath successAuth action');
            props.actions.successAuthentication(cookie.load('token'));
        } else if (!props.isAuthenticated) {
            console.log("redirecting to login");
            this.context.router.push('/login');
        } else {
            console.log("already Authenticate");
        }
    }
        
    render() {
        console.log('rendering UserOnly');
        return (
            <div>
                <h4>UserOnly</h4>
                {this.props.children}
            </div>
        )
    }
}

UserOnly.contextTypes = {
        router: React.PropTypes.object.isRequired
};

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
)(UserOnly)
