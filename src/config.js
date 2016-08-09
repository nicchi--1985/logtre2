export function getTimeChartData(data=null) {
    return {
        datasets: [
            {
                label: "取引成績",
                data: data,
                fill: false,
                lineTension: 0.0,
                strokeColor: "rgba(62, 253, 52,1)",
                backgroundColor: "rgba(62, 253, 52,0.4)",
                borderColor: "rgba(62, 253, 52,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(62, 253, 52,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            }
        ]
    }
}

function getTimeOption(time_unit="month") {
    if (time_unit == "month") {
        return {
            unit: "month",
            displayFormats: {
                month: 'YYYY-MM'
            },
            tooltipFormat: 'll'
        }
    } else if (time_unit == "week") {
        return {
            unit: "week",
            tooltipFormat: 'll'
        }
    } else {
        console.log("didn't match any time unit.")
    }
}

export function getTimeChartOptions(time_unit="month") {
    return {
        scaleLineWidth : 1,
        fullWidth: false,
        bezierCurve: false,
        datasetFill : false,
        responsive: true,
        title:{
            display:true,
            text:"Chart.js Time Scale"
        },
        scales: {
            xAxes: [{
                type: "time",
                time: getTimeOption(time_unit),
                scaleLabel: {
                    display: true,
                    labelString: '取引日'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '損益(円)'
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        },
    }
}