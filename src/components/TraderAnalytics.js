import React, { Component } from 'react'

//後でapi responseと入れ替える
const analytics_json = {
    "trader_type": "リスキータイプ",
    "term_trade_count": "50",
    "new_remaining_days": "30",
    "settlement_remaining_days": "40",
    "holding_avg": "5",
    "max_gain_loss": "100000",
    "min_gain_loss": "-20000",
    "avg_gain_loss": "30000",
    "sd_gain_loss": "???"
}

export default class TraderAnalytics extends Component {
    render() {
        return (
            <div>
                <h5>分析チャート描画位置</h5>
                <div><h6>{analytics_json.trader_type}</h6></div>
                <table>
                    <tbody>
                        <tr>
                            <th>期間中取引回数</th>
                            <td>{analytics_json.term_trade_count}</td>
                        </tr>
                        <tr>
                            <th>SQまでの残日数(新規)</th>
                            <td>{analytics_json.new_remaining_days}</td>
                        </tr>
                        <tr>
                            <th>SQまでの残日数(決済)</th>
                            <td>{analytics_json.settlement_remaining_days}</td>
                        </tr>
                        <tr>
                            <th>平均保有期間</th>
                            <td>{analytics_json.holding_avg}</td>
                        </tr>
                        <tr>
                            <th>損益最高</th>
                            <td>{analytics_json.max_gain_loss}</td>
                        </tr>
                        <tr>
                            <th>損益最低</th>
                            <td>{analytics_json.min_gain_loss}</td>
                        </tr>
                        <tr>
                            <th>損益平均</th>
                            <td>{analytics_json.avg_gain_loss}</td>
                        </tr>
                        <tr>
                            <th>損益偏差</th>
                            <td>{analytics_json.sd_gain_loss}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}