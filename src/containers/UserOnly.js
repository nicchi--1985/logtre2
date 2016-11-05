import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router'
import cookie from 'react-cookie';
import * as authActions from '../redux/modules/auth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import { commonStyle } from '../config'

const appBarProps = {
  title: "",
  style: {
      backgroundColor: commonStyle.primaryColor
  }
}

const contentStyle = {
  "maxWidth": "800px"
}

const menuButtonStyle = {
    root: {
        "width":"33.3%",
        "border":"2px solid #fff",
    },
    label: {
        "fontSize": "large",
        "color": "#fff"
    }
}


class UserOnly extends Component {
    componentWillMount() {
        this.checkAuth(this.props);
    }
    
    checkAuth(props) {
        if (!props.isAuthenticated && cookie.load('token')) {
            props.actions.successAuthentication(cookie.load('token'));
        } else if (!props.isAuthenticated) {
            this.context.router.push('/login');
        } else {
            console.error("already Authenticate");
        }
    }
        
    render() {
        const user_msg = (
            <p>
            {this.props.currentUser ? `ID: ${this.props.currentUser.name}` : ''}
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
                    <div id="header" style={{"marginBottom":"20px"}}>
                        <AppBar {...appBarProps} 
                                iconElementRight={user_msg} 
                                iconElementLeft={<img src={require('../assets/img/logtre_logo.jpg')} style={{"width":"70px"}} />}
                                iconStyleLeft={{"marginLeft":"10px"}}
                                iconStyleRight={{"color":"white", "marginRight":"10px"}} />
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
        currentUser: state.auth.user
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
)(UserOnly)
