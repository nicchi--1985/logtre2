import React, { Component } from 'react'
import { Link } from 'react-router'

export default class ChartList extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this)
        this.render_list = this.render_list.bind(this)
    }

    render_list(data) {
        return data.map((product, i)=>{
            return <li key={`${i}`}><Link to={ `/chart/${this.props.broker}/${product.name}` }>{product.disp_name}　損益　{product.gain_loss_total}</Link></li>
        })
    }
    
    render() {
        const charts = this.render_list(this.props.products); 
        return (
            <div>
                <h5>チャート一覧</h5>
                <ul>
                    {charts}
                </ul>
            </div>
        )
    }
}