import React, { Component } from 'react'

// 後でapi responseと入れ替える
const charts_json = [
    {
        "id":"1",
        "product_name":"日経平均先物",
        "total_gain_loss": "+40,000円"
    },
    {
        "id":"2",
        "product_name":"225オプション プット",
        "total_gain_loss": "-2,000円"
    },
    {
        "id":"3",
        "product_name":"225オプション コール",
        "total_gain_loss": "+80,000円"
    }
]

export default class ChartList extends Component {
    render_list(data) {
        return data.map((chart)=>{
            return <li key={chart.id}>{chart.product_name}　損益　{chart.total_gain_loss}</li>
        })
    }
    
    render() {
        const charts = this.render_list(charts_json); 
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