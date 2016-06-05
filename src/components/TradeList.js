import React, { Component } from 'react'

export default class TradeList extends Component {
    // this.props.
    render() {
        console.log('start rendering TradeList')
        console.log(this.props)
        const sample_trades = [{id:"1",name:"first"},{id:"2",name:"second"},{id:"3",name:"third"}]
        const elements = sample_trades.map(trade => {
            <li key=`trade_id_{trade.id}`>{trade.name}</li>
        })
        return (
            <ol>
            {elements}
            </ol>
        )
    }
}