import React, { Component } from 'react'
import { commonStyle } from '../config'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class PerformanceSummary extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }
    
    render() {
        console.log("aaaaaaaaaaa!!!!!!!!!!!!!!!!!")
        console.log(this.props.summary)
        return (
            <div>
                <div style={commonStyle.heading}><p style={{"margin":"5px 0"}}>投資成績</p></div>
                <Table selectable={false} style={commonStyle.table.root}>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>四半期損益</TableHeaderColumn>
                            <TableRowColumn>{this.props.summary.gain_loss}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>ROI(年間)</TableHeaderColumn>
                            <TableRowColumn>{this.props.summary.roi}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>取引回数</TableHeaderColumn>
                            <TableRowColumn>{this.props.summary.trade_count}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}