import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookie';
import * as Actions from '../actions/actions';

class UserOnly extends Component {
    componentWillMount() {
        console.log("user will mount");
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
        const user_msg = this.props.currentUser ? `welcome ${this.props.currentUser.name}` : ''
        return (
            <div>
                <h4>UserOnly</h4>
                <p>{user_msg}</p>
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
        isAuthenticated: state.auth.token,
        currentUser: state.user
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
