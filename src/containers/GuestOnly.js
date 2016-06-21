import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { successAuthentication } from '../actions/actions'

class GuestOnly extends Component {
    componentWillMount() {
        this.checkAuth(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.checkAuth(nextProps);
    }
    
    checkAuth(props) {
        if (props.isAuthenticated) {
            console.log(props.isAuthenticated)
            console.log("already authenticated");
            console.log(this.context.router)
            this.context.router.replace("/top");
        } else if (props.location.query.token) {
            // FIXME:should check more strict
            console.log(props.isAuthenticated)
            console.log("authenticated just now");
            const token = props.location.query.token;
            props.successAuthentication(token);
        }
    }
    
    render() {
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
        successAuthentication: (token)=> dispatch(successAuthentication(token))
    }
}

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(GuestOnly)
