import React, { Component } from 'react'

export default class PerformanceSummary extends Component {
    render() {
        return (
            <div>
                <h5>投資成績</h5>
                <table>
                  <tbody>
                    <tr>
                        <th>四半期損益</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>ROI(年間)</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>取引回数</th>
                        <td></td>
                    </tr>
                  </tbody>
                </table>
            </div>
        )
    }
}