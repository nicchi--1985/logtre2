import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions/actions'

class UserOnly extends Component {
    componentWillMount() {
        this.checkAuth(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.checkAuth(nextProps);
    }
    
    checkAuth(props) {
        if (!props.isAuthenticated) {
            console.log(this.context)
            console.log(props.isAuthenticated)
            console.log("redirecting to login");
            this.context.router.replace("/login")
        }
    }
        
    render() {
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
