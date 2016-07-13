import React, { Component } from 'react'

export default class TradesUploadForm extends Component {
    constructor(props) {
        super(props);
        this.stockComp = ""
        this.upFile = null
        this.stockCompChange = this.stockCompChange.bind(this);
        this.fileChange = this.fileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    stockCompChange(e) {
        this.stockComp = e.target.value;
    }
    
    fileChange(e) {
        this.upFile = e.target.files[0];
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const body = {
            stockComp: this.stockComp,
            upFile: this.upFile
        }
        this.props.uploadCSVFile(body);
    }
    
    render() {
        console.log('upload form');
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="stock_company">証券会社</label>
                <select id="stock_company" onChange={this.stockCompChange}>
                    <option value="">証券会社を選択して下さい</option>
                    <option value="sbi">SBI証券</option>
                </select>
                <input type="file" name="file" onChange={this.fileChange}/>
                <input type="submit" value="アップロード" />
            </form>
        )
    }
}