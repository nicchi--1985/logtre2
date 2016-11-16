import { getApiHost } from '../../config'
const apiHost = getApiHost()

const RECEIVE_CHARTDATA = 'logtre/chart/RECEIVE_CHARTDATA';
const RECEIVE_NIKKEIDATA = 'logtre/chart/RECEIVE_NIKKEIDATA';
const RECEIVE_RADARDATA = 'logtre/chart/RECEIVE_RADARDATA';
const COUNTDOWN_TERM = 'logtre/chart/COUNTDOWN_TERM';
const COUNTUP_TERM = 'logtre/chart/COUNTUP_TERM';

const initial_state = {
    chartData: {
        data: [],
        time_unit: "month",
        term: 1,
        term_start: "",
        term_end: "",
        term_days: 180
    },
    nikkeiData: {
        data_n: [],
        time_unit_n: "month",
        term: 1,
        term_start: "",
        term_end: "",
        term_days: 180
    },
    radarData: []
}

export default function reducer(state=initial_state, action={}) {
    switch (action.type) {
        case RECEIVE_CHARTDATA:
            return Object.assign({}, state, {
                chartData: {
                data: action.payload.data,
                time_unit: action.payload.time_unit,
                term: state.chartData.term,
                term_start: action.payload.term_start,
                term_end: action.payload.term_end,
                term_days: 180
                }
            })
        case RECEIVE_NIKKEIDATA:
            console.log('RECEIVE_NIKKEIDATA')
            console.log(action.payload)
            return Object.assign({}, state, {
                nikkeiData: {
                data_n: action.payload.data,
                time_unit_n: action.payload.time_unit,
                term: state.chartData.term,
                term_start: action.payload.term_start,
                term_end: action.payload.term_end,
                term_days: 180
                }
            })
        case RECEIVE_RADARDATA:
            return Object.assign({}, state, {
                radarData: action.payload
            })
        case COUNTUP_TERM:
            return Object.assign({}, state, {
                chartData: {
                data: state.chartData.data,
                time_unit: state.chartData.time_unit,
                term: state.chartData.term + 1,
                term_start: state.chartData.term_start,
                term_end: state.chartData.term_end,
                term_days: 180
                }
            })
        case COUNTDOWN_TERM:
            return Object.assign({}, state, {
                chartData: {
                data: state.chartData.data,
                time_unit: state.chartData.time_unit,
                term: state.chartData.term - 1,
                term_start: state.chartData.term_start,
                term_end: state.chartData.term_end,
                term_days: 180
                }
            })
        default:
            return state
    }
}

function receiveChartData(data) {
    return {
        type: RECEIVE_CHARTDATA,
        payload: data
    }
}

function receiveNikkeiData(data) {
    return {
        type: RECEIVE_NIKKEIDATA,
        payload: data
    }
}

function receiveRadarData(data) {
    return {
        type: RECEIVE_RADARDATA,
        payload: data
    }
}

export function countupChartDataTerm() {
    return {
        type: COUNTUP_TERM
    }
}

export function countdownChartDataTerm() {
    return {
        type: COUNTDOWN_TERM
    }
}

export function getChartData(broker, product, term) {
    return (dispatch, getState) => {
        // do something
        const { auth, chartData } = getState();
        const fetch_cfg = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        }
        console.log(`start fetching chart data for ${broker}/${product}?term=${term}`)
        return fetch(`${apiHost}/api/trades/${broker}/${product}?term=${term}`, fetch_cfg)
                .then( (res) => {
                    if (res.status == 200) {
                        return res.json();
                    } else {
                        console.error("error occured geting products");
                    }
                }).then( (data) => {
                    dispatch(receiveChartData(data));
                })
    }
}

export function getNikkeiData(start, end) {
    return (dispatch, getState) => {
        // do something
        const { auth } = getState();
        const fetch_cfg = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        }
        console.log(`start fetching nikkei data`)
        return fetch(`${apiHost}/api/chart_data/nikkei?start=${start}&end=${end}`, fetch_cfg)
                .then( (res) => {
                    if (res.status == 200) {
                        return res.json();
                    } else {
                        console.error("error occured geting products");
                    }
                }).then( (data) => {
                    dispatch(receiveNikkeiData(data));
                })
    }
}

export function getRadarData() {
    return (dispatch, getState) => {
        // do something
        const { auth } = getState();
        const fetch_cfg = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        }
        console.log("start fetching radar data")
        return fetch(`${apiHost}/api/trades/analytics`, fetch_cfg)
                .then( (res) => {
                    if (res.status == 200) {
                        return res.json();
                    } else {
                        console.error("error occured geting products");
                    }
                }).then( (data) => {
                    dispatch(receiveRadarData(data));
                })
    }
}
