import React, { Component } from 'react'

//後でapi responseと入れ替える
const analytics_json = [
    {
        name: "期間中取引回数",
        value: "0.8"
    },
    {
        name: "SQまでの残日数(新規)",
        value: "4.3"
    },
    {
        name: "SQまでの残日数(決済)",
        value: "5.0"
    },
    {
        name: "平均保有期間",
        value: "1.8"
    },
    {
        name: "損益最高",
        value: "2.0"
    },
    {
        name: "損益最低",
        value: "4.0"
    },
    {
        name: "損益平均",
        value: "5.0"
    }
]

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
                <tr key={"index-" + i}>
                    <th>{index.name}</th>
                    <td>{index.real_val}</td>
                </tr>
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
                {graph}
                <div><h6>{analytics_json.trader_type}</h6></div>
                <table>
                    <tbody>
                        {indexList}
                    </tbody>
                </table>
            </div>
        )
    }
}