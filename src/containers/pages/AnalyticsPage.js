import React, { Component } from 'react'
import TraderAnalytics from '../../components/TraderAnalytics'

export default class AnalyticsPage extends Component {
    render() {
        return (
            <div>
                <h4>投資行動分析</h4>
                <TraderAnalytics />
            </div>
        )
    }
}