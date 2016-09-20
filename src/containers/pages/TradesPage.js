import React, { Component } from 'react'
import TradeList from '../../components/TradeList'

export default class TradesPage extends Component {
    componentWillMount() {
        this.props.actions.fetchTrades()    
    }
    
    render() {
        return (
            <div>
                <h1>trade history</h1>
                <TradeList trades={this.props.trades} />
            </div>
        )
    }
}
