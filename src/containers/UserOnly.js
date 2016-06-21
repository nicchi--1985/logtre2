import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserOnly extends Component {
    componentWillMount() {
        this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuth();
    }
    
    checkAuth() {
        if (!this.props.isAuthenticated) {
            console.log(this.props);
            console.log(this.props.router)
            this.props.history.pushState(null, "/login")
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
)(UserOnly)
