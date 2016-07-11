import React, { Component } from 'react'
import { Link } from 'react-router'

export default class StockCompanyList extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }
    render_list(data) {
        return data.map((comp)=>{
            return <Link to={ "/charts/" + comp.name } key={comp.id}>{comp.disp_name}</Link>
        })
    }
    
    render() {
        const company = this.render_list(this.props.brokers); 
        return (
            <div>
                <h5>証券会社一覧</h5>
                <ul>
                    {company}
                </ul>
            </div>
        )
    }
}