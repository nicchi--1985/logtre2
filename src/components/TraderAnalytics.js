import React, { Component } from 'react'
import { commonStyle } from '../config'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const options = {
    legend: {
        position: "top"
    },
    title: {
        display: true,
        text: 'Chart.js Radar Chart'
    },
    scale: {
        reverse: false,
        ticks: {
            beginAtZero: true,
            max: 10
        }
    }
}

function create_radar_data(data) {
    const labels = data.map((index) => {
        return index.name
    })
    const values = data.map((index) => {
        return index.value
    })
    return {
        labels: labels,
        datasets: [{
            label: "trader analytics",
            data: values,
            backgroundColor: "rgba(62, 253, 52, 0.4)",
            borderColor: "rgba(62, 253, 52, 1.0)"
        }]
    }
}

export default class TraderAnalytics extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    render_list(data) {
        return data.map((index, i)=>{
            return (
                <TableRow key={"index-" + i}>
                    <TableHeaderColumn>{index.name}</TableHeaderColumn>
                    <TableRowColumn>{index.real_val}</TableRowColumn>
                </TableRow>
            )
        })
    }

    render() {
        let graph;
        let indexList;
        if (typeof(window) == 'undefined') {
            graph = (<div></div>);
            indexList = null;
        } else if(this.props.radarData.length == 0) {
            console.log("there is no chart data")
            graph = (<div></div>);
            indexList = null;
        } else {
            const Radar = require('react-chartjs').Radar
            const data = create_radar_data(this.props.radarData)
            graph = (<Radar data={data} options={options} width="250" height="200"/>)
            indexList = this.render_list(this.props.radarData)
        }
        return (
            <div>
                <div style={commonStyle.heading}><p style={{"margin":"5px 0"}}>あなたの投資傾向</p></div>
                {graph}
                <Table>
                    <TableBody displayRowCheckbox={false}>
                        {indexList}
                    </TableBody>
                </Table>
            </div>
        )
    }
}