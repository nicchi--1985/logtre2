import React, { Component } from 'react'
import { commonStyle } from '../config'
import { getTimeChartData, getTimeChartOptions } from '../config'

export default class ChartCanvas extends Component {
    render() {
        let graph;
        if (typeof(window) == 'undefined') {
            graph = (<div></div>);
        } else if(this.props.chartData.length == 0) {
            console.log("there is no chart data")
            graph = (<div></div>);
        } else {
            const Line = require('react-chartjs').Line
            const { data, time_unit } = this.props.chartData
            graph = (<Line data={getTimeChartData(data)} options={getTimeChartOptions(time_unit)} width="400" height="150"/>)
        }
        return (
            <div style={{width: "95%"}} >
                <div style={commonStyle.heading}><p style={{"margin":"5px 0"}}>あなたの投資履歴</p></div>
                {graph}
            </div>
        )
    }
}