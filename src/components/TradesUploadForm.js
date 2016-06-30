import React, { Component } from 'react'

export default class TradesUploadForm extends Component {
    render() {
        console.log('upload form');
        return (
            <form action="/api/import" method="POST" encType="multipart/form-data">
                <label htmlFor="stock_company">証券会社</label>
                <select id="stock_company">
                    <option value="">証券会社を選択して下さい</option>
                    <option value="sbi">SBI証券</option>
                </select>
                <input type="file" name="file" />
            </form>
        )
    }
}