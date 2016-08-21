import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router'
import cookie from 'react-cookie';
import * as Actions from '../actions/actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import { commonStyle } from '../config'

const appBarProps = {
  title: "Logtre",
  style: {
      backgroundColor: commonStyle.primaryColor
  }
}

const contentStyle = {
  "max-width": "800px"
}

const menuButtonStyle = {
    root: {
        "width":"33.3%",
        "border":"2px solid #fff",
    },
    label: {
        "font-size": "large",
        "color": "#fff"
    }
}


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
        const user_msg = (
            <p>
            {this.props.currentUser ? `welcome ${this.props.currentUser.name}` : ''}
            </p>
        )
        const tabs = (
            <Tabs>
                <Tab label="Top"></Tab>
                <Tab label="Analytics"></Tab>
                <Tab label="Settings"></Tab>
            </Tabs>
        )
        const rightStyle = {"widht":"200px"}
        return (
            <MuiThemeProvider>
                <div id="content" style={contentStyle}>
                    <div id="header" style={{"margin-bottom":"20px"}}>
                        <AppBar {...appBarProps} iconElementRight={user_msg} />
                        <Link to="/top"><FlatButton label="トップ" 
                                                    style={menuButtonStyle.root} 
                                                    labelStyle={menuButtonStyle.label}
                                                    backgroundColor={commonStyle.primaryColor}/></Link>
                        <Link to="/analytics"><FlatButton label="行動分析" 
                                                        style={menuButtonStyle.root}
                                                        labelStyle={menuButtonStyle.label}
                                                        backgroundColor={commonStyle.primaryColor} /></Link>
                        <Link to="/setting"><FlatButton label="設定" 
                                                        style={menuButtonStyle.root}
                                                        labelStyle={menuButtonStyle.label}
                                                        backgroundColor={commonStyle.primaryColor} /></Link>
                    </div>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
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
