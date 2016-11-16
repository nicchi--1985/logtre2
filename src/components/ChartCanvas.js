import React, { Component } from 'react'
import { commonStyle } from '../config'

export default class ChartCanvas extends Component {
    render() {
        let graph;
        if (typeof(window) == 'undefined') {
            graph = (<div></div>);
        } else if(this.props.chartData.length == 0) {
            graph = (<div></div>);
        } else {
            const Line = require('react-chartjs').Line
            graph = (<Line data={this.props.chartData} 
                           options={this.props.options} 
                           maintainAspectRatio={false}
                           width="400" 
                           height="150"/>)
        }
        return (
            <div style={{width: "95%"}} >
                {graph}
            </div>
        )
    }
}