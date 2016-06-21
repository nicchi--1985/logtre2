import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { authWithFacebook } from '../actions/actions'

class GuestOnly extends Component {
    componentWillMount() {
        this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuth();
    }
    
    checkAuth() {
        if (this.props.isAuthenticated) {
            console.log(this.props);
            console.log(this.props.router)
            this.props.history.pushState(null, "/")
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

function mapStateToPorps(state) {
    return {
        isAuthenticated: state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authWithFacebook: ()=>authWithFacebook()
    }
}

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(GuestOnly)
