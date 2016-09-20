import React, { Component } from 'react'

export default class TradeList extends Component {
    // this.props.
    render() {
        const trades = this.props.trades
        const elements = trades.map((trade) => {
            const key = "trade_id_" + trade.id
            return (
                <tr key={key}>
                    <td>{trade.brand_name}</td>
                    <td>{trade.gain_loss_amount}円</td>
                </tr>
            )
        })
        return (
            <table>
                <tbody>
                    {elements}
                </tbody>
            </table>
        )
    }
}