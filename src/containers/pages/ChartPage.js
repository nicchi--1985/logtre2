import React, { Component } from 'react'
import ChartCanvas from '../../components/ChartCanvas'
import PerformanceSummary from '../../components/PerformanceSummary'

export default class ChartPage extends Component {
    render() {
        return (
            <div>
                <h4>here's your Chart!</h4>
                <ChartCanvas />
                <PerformanceSummary />
            </div>
        )
    }
}