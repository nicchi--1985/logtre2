import React, { Component } from 'react'

// 後でapi responseと入れ替える
const summary = {
    "trader_type": "リスキータイプ",
    "quater_gain_loss": "+400,500円",
    "roi": "15%",
    "best_category": "飲食業",
    "trade_count": "50回"
}

export default class PerformanceSummary extends Component {
    // this.props.
    render() {
        return (
            <div>
                <h5>投資成績</h5>
                <table>
                  <tbody>
                    <tr>
                        <th>投資家タイプ</th>
                        <td>{summary.trader_type}</td>
                    </tr>
                    <tr>
                        <th>四半期損益</th>
                        <td>{summary.quater_gain_loss}</td>
                    </tr>
                    <tr>
                        <th>ROI(年間)</th>
                        <td>{summary.roi}</td>
                    </tr>
                    <tr>
                        <th>類似収益事業</th>
                        <td>{summary.best_category}</td>
                    </tr>
                    <tr>
                        <th>取引回数</th>
                        <td>{summary.trade_count}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
        )
    }
}