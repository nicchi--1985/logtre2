export function getApiHost() {
    if (process.title == 'browser') {
        if (window.__ENV__ == 'development') {
            return 'http://local.logtre.com'
        } else if (window.__ENV__ == 'production') {
            return 'http://app.logtre.com'
        }
    } else {
        if (process.env.NODE_ENV == 'development') {
            return 'http://local.logtre.com'
        } else if (process.env.NODE_ENV == 'production') {
            return 'http://app.logtre.com'
        }
    }
}

export const commonStyle = {
    primaryColor: "#92C717",
    heading: {
        "color": "#444",
        "borderBottom": `3px solid #92C717`
    },
    table: {
        root:{
            "margin": "5px 10px"
        },
        header: {
            "backgroundColor": "#eee"
        },
        headerRow: {
            "color": "#000"
        }
    }
}


export function getTimeChartData(data=null, data_n=null) {
    return {
        datasets: [
            {
                label: "取引成績",
                data: data,
                yAxisID: "user_trade",
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
            },{
                label: "日経平均",
                data: data_n,
                yAxisID: "nikkei",
                fill: false,
                lineTension: 0.0,
                strokeColor: "rgba(62, 253, 52,1)",
                backgroundColor: "rgba(206,206,206,0.4)",
                borderColor: "rgba(206,206,206,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(206,206,206,1)",
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
            text:""
        },
        layout: {
            padding: 100
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
                position: "left",
                id: "user_trade",
                scaleLabel: {
                    display: true,
                    labelString: '損益(円)'
                },
                ticks: {
                    callback: function(label, index, labels) {
                        return [label].toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,')
                    },
                    beginAtZero: true
                }
            },{
                position: "right",
                id: "nikkei",
                scaleLabel: {
                    display: true,
                    labelString: '日経平均(円)'
                }
            }]
        },
    }
}
