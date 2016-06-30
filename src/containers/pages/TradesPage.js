import React, { Component } from 'react'
import TradeList from '../../components/TradeList'

export default class TradesPage extends Component {
    componentWillMount() {
        console.log("conponentWillMount")
        this.props.actions.fetchTrades()    
    }
    
    render() {
        console.log("TradePage")
        return (
            <div>
                <h1>trade history</h1>
                <TradeList trades={this.props.trades} />
            </div>
        )
    }
}
