import React, { Component } from 'react'
import { connect } from 'react-redux';
import TradesUploadForm from '../../components/TradesUploadForm'

class SettingPage extends Component {
    render() {
        console.log('setting page');
        return (
            <div>
                <TradesUploadForm locationOrigin={this.props.locationOrigin}/>
            </div>
        )
    }
}

function mapStateToPorps(state) {
    return {
        locationOrigin: state.locationOrigin
    }
}

export default connect(mapStateToPorps, null)(SettingPage)