import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cookie from 'react-cookie';
import * as Actions from '../actions/actions';

class GuestOnly extends Component {
    componentWillMount() {
        console.log("guest will mount");
        this.checkAuth(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        console.log("guest will receive props");
        this.checkAuth(nextProps);
    }
    
    checkAuth(props) {
        console.log('checking for auth');
        if (props.isAuthenticated) {
            console.log('found in store');
            this.context.router.push("/top");
        } else if (cookie.load('token')) {
            console.log('found in cookie');
            this.context.router.push("/top");
            this.props.actions.successAuthentication(cookie.load('token'));
        } else if (props.location.query.token) {
            // FIXME:should check more strict
            console.log('found in query');
            const token = props.location.query.token;
            cookie.save('token', token);
            props.actions.successAuthentication(token);
        }
    }
    
    render() {
        console.log('rendering GuestOnly');
        const childrenWithProps = React.cloneElement(this.props.children, {...this.props})
        return (
            <div>
                <h4>GuestOnly</h4>
                {childrenWithProps}
            </div>
        )
    }
}

GuestOnly.contextTypes = {
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
)(GuestOnly)
