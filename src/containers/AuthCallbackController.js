import path from 'path'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { checkAuth } from '../actions/actions'

class AuthCallbackController extends Component {
    componentWillReceiveProps(nextProps) {
        this.props.checkAuth
    }
    
    render() {
        console.log(this.props)
        const token = this.props.location.query.token
        return (
            <div>
                <h3>authentication success</h3>
                {token}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        
    }
}

function mapDispatchToProps(dispatch) {
    return {
        checkAuth: ()=>checkAuth()
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthCallbackController)
