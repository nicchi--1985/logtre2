import React, { Component } from 'react'
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
            console.log("ChartCanvas!!!!")
            console.log(this.props.chartData)
            const { data, time_unit } = this.props.chartData
            graph = (<Line data={getTimeChartData(data)} options={getTimeChartOptions(time_unit)} width="400" height="150"/>)
        }
        const style = {width: "65%"}
        return (
            <div style={style} >
                {graph}
            </div>
        )
    }
}