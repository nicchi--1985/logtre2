import React, { Component } from 'react'
import { connect } from 'react-redux';
import TradesUploadForm from '../../components/TradesUploadForm'
import { uploadCSVFile, changeUploadForm } from '../../actions/actions'

const contentStyle = {
    "padding": "10px 10px"
}

class SettingPage extends Component {
    render() {
        return (
            <div style={contentStyle}>
                <TradesUploadForm uploadForm={this.props.uploadForm}
                                  changeUploadForm={this.props.changeUploadForm}
                                  uploadCSVFile={this.props.uploadCSVFile}/>
            </div>
        )
    }
}

function mapStateToPorps(state) {
    return {
        uploadForm: state.uploadForm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uploadCSVFile: (payload) => dispatch(uploadCSVFile(payload)),
        changeUploadForm: (uploadForm) => dispatch(changeUploadForm(uploadForm))
    }
}

export default connect(mapStateToPorps, mapDispatchToProps)(SettingPage)