import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cookie from 'react-cookie';
import * as authActions from '../redux/modules/auth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { commonStyle } from '../config';

const appBarProps = {
  title: "Logtre",
  style: {
      backgroundColor: commonStyle.primaryColor
  }
}

const contentStyle = {
  "maxWidth": "700px"
}


class GuestOnly extends Component {
    componentWillMount() {
        this.checkAuth(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.checkAuth(nextProps);
    }
    
    checkAuth(props) {
        if (props.isAuthenticated) {
            this.context.router.push("/top");
        } else if (cookie.load('token')) {
            this.context.router.push("/top");
            this.props.actions.successAuthentication(cookie.load('token'));
        } else if (props.location.query.token) {
            // FIXME:should check more strict
            const token = props.location.query.token;
            cookie.save('token', token);
            props.actions.successAuthentication(token);
        }
    }
    
    render() {
        const childrenWithProps = React.cloneElement(this.props.children, {...this.props})
        return (
            <MuiThemeProvider>
                <div id="content" style={contentStyle}>
                    <AppBar {...appBarProps} />
                    {childrenWithProps}
                </div>
            </MuiThemeProvider>
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
        actions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(GuestOnly)
