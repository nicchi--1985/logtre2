import React, { Component } from 'react'
import { Link } from 'react-router'
import { commonStyle } from '../config'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class StockCompanyList extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }
    render_list(data) {
        return data.map((comp, i)=>{
            return (
                <TableRow key={"comp"+i}>
                    <TableRowColumn>
                        <Link to={ "/charts/" + comp.name }>{comp.disp_name}</Link>
                    </TableRowColumn>
                </TableRow>
            )
        })
    }
    
    render() {
        const company = this.render_list(this.props.brokers); 
        return (
            <div>
                <div style={commonStyle.heading}><p style={{"margin":"5px 0"}}>証券会社一覧</p></div>
                <Table selectable={false} style={commonStyle.table.root}>
                    <TableHeader style={commonStyle.table.header} displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow><TableHeaderColumn style={commonStyle.table.headerRow}>ご利用証券会社一覧</TableHeaderColumn></TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                    {company}
                    </TableBody>
                </Table>
            </div>
        )
    }
}