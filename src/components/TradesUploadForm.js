import React, { Component } from 'react'
import { commonStyle } from '../config'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Spinner from 'react-spinkit';

const loading_screen = {
    position: 'absolute',
    top: '-50px',
    left: '-5px',
    width: '100%',
    height: '140%',
    backgroundColor: 'rgba(0,0,0,0.4)'
}

const loading_wrapper = {
    position: 'relative',
    top: '45%',
    left: '45%'
}

export default class TradesUploadForm extends Component {
    constructor(props) {
        super(props);
        this.stockComp = 0
        this.upFile = null
        this.stockCompChange = this.stockCompChange.bind(this);
        this._openFileDialog = this._openFileDialog.bind(this);
        this.fileChange = this.fileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.render = this.render.bind(this);
    }
    stockCompChange(e, i, value) {
        this.props.uploadForm.broker = value;
        this.props.changeUploadForm(this.props.uploadForm);
    }

    _openFileDialog() {
      const fileDom = this.refs.fileUpload
      fileDom.click()
    }
    
    fileChange(e) {
        this.props.uploadForm.file = e.target.files[0]
        this.props.changeUploadForm(this.props.uploadForm);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        let broker = this.props.uploadForm.broker
        let file = this.props.uploadForm.file
        if (broker != 0 && file != null) {
          this.props.uploadCSVFile(this.props.uploadForm);
        } else {
          console.log("Error: need to select broker and file.")
        }
    }
    
    render() {
        let loader = <div></div>
        if (this.props.uploadForm.loading == true) {
            loader = ( 
            <div id="loading-screen" style={loading_screen}>
                <div id="loading-wrapper" style={loading_wrapper}>
                    <Spinner spinnerName='circle' />
                    <p>now loading...</p>
                </div>
            </div>)
        }
        return (
          <div style={{position: 'relative'}}>
            <h4>証券会社から出力した取引履歴csvをログトレに取り込む</h4>
            <FlatButton label={this.props.uploadForm.message} secondary={true} />
            <form onSubmit={this.handleSubmit}>
                <SelectField value={this.props.uploadForm.broker} onChange={this.stockCompChange} > 
                  <MenuItem value={0} primaryText="証券会社を選択して下さい" />
                  <MenuItem value="sbi" primaryText="SBI証券" />
                </SelectField>
                <div></div>
                <FlatButton label={this.props.uploadForm.file.name}
                            style={{"borderBottom":`1px solid ${commonStyle.primaryColor}`}}
                            onClick={this._openFileDialog}/>
                <input type="file"
                       name="file"
                       ref="fileUpload"
                       style={{"display":"none"}}
                       onChange={this.fileChange}/>
                <div style={{"marginBottom":"10px"}}></div>
                <RaisedButton type="submit" label="アップロード" backgroundColor={commonStyle.primaryColor} />
                {loader}
            </form>
          </div>
        )
    }
}