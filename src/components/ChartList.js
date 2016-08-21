import React, { Component } from 'react'
import { Link } from 'react-router'
import { commonStyle } from '../config'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class ChartList extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this)
        this.render_list = this.render_list.bind(this)
    }

    render_list(data) {
        return data.map((product, i)=>{
            return (
                <TableRow key={`${i}`}>
                    <TableRowColumn>
                        <Link to={ `/chart/${this.props.broker}/${product.name}` }>{product.disp_name}</Link>
                    </TableRowColumn>
                    <TableRowColumn>
                        損益　{product.gain_loss_total}
                    </TableRowColumn>
                </TableRow>
            )
        })
    }
    
    render() {
        const charts = this.render_list(this.props.products); 
        return (
            <div>
                <div style={commonStyle.heading}><p style={{"margin":"5px 0"}}>チャート一覧</p></div>
                <Table style={commonStyle.table.root}>
                    <TableHeader style={commonStyle.table.header} displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={commonStyle.table.headerRow}>商品</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {charts}
                    </TableBody>
                </Table>
            </div>
        )
    }
}