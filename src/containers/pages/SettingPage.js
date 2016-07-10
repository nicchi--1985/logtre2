import React, { Component } from 'react'
import { connect } from 'react-redux';
import TradesUploadForm from '../../components/TradesUploadForm'
import { uploadCSVFile } from '../../actions/actions'

class SettingPage extends Component {
    render() {
        console.log('setting page');
        return (
            <div>
                <TradesUploadForm uploadCSVFile={this.props.uploadCSVFile}/>
            </div>
        )
    }
}

function mapStateToPorps(state) {
    return {
        locationOrigin: state.locationOrigin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uploadCSVFile: (payload) => dispatch(uploadCSVFile(payload))
    }
}

export default connect(mapStateToPorps, mapDispatchToProps)(SettingPage)