import React, { Component } from 'react'
import { connect } from 'react-redux';
import TradesUploadForm from '../../components/TradesUploadForm'
import { uploadCSVFile } from '../../actions/actions'

class SettingPage extends Component {
    render() {
        return (
            <div>
                <TradesUploadForm uploadCSVFile={this.props.uploadCSVFile}/>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uploadCSVFile: (payload) => dispatch(uploadCSVFile(payload))
    }
}

export default connect(null, mapDispatchToProps)(SettingPage)