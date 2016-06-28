import React, { Component } from 'react'

// 後でapi responseと入れ替える
const comp_json = [
    {"id":"1","name":"SBI証券"},
    {"id":"2","name":"楽天証券"}
]

export default class StockCompanyList extends Component {
    render_list(data) {
        return data.map((comp)=>{
            return <li key={comp.id}>{comp.name}</li>
        })
    }
    
    render() {
        const company = this.render_list(comp_json); 
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