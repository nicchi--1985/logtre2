import { getApiHost } from '../../config';
const apiHost = getApiHost()

const RECEIVE_TRADES = 'logtre/resource/RECEIVE_TRADES';
const RECEIVE_SUMMARY = 'logtre/resourse/RECEIVE_SUMMARY';
const RECEIVE_BROKERS = 'logtre/resourse/RECEIVE_BROKERS';
const RECEIVE_PRODUCTS = 'logtre/resourse/RECEIVE_PRODUCTS';

const initial_state = {
    trades: [{
        id:"1",
        name:"first"}],
    performanceSummary: {
        gain_loss: null, 
        roi: null, 
        trade_count: null},
    brokers: [],
    products: [],
}

export default function reducer(state=initial_state, action={}) {
    switch (action.type) {
        case RECEIVE_TRADES:
            return Object.assign({}, state, {
                trades: action.payload
            })
        case RECEIVE_SUMMARY:
            console.log('RECEIVE_SUMMARY');
            console.log(action.summary);
            return Object.assign({}, state, {
                performanceSummary: action.summary
            })
        case RECEIVE_BROKERS:
            console.log('RECEIVE_BROKERS');
            console.log(action.brokers);
            return Object.assign({}, state, {
                brokers: action.brokers
            })
        case RECEIVE_PRODUCTS:
            return Object.assign({}, state, {
                products: action.products
            })
        default:
            return state
    }
}

function receiveTrades(data) {
    return {
        type: RECEIVE_TRADES,
        payload: data
    }
}

function receiveSummary(summary) {
    return {
        type: RECEIVE_SUMMARY,
        summary: summary
    }
}

function receiveBrokers(brokers) {
    return {
        type: RECEIVE_BROKERS,
        brokers: brokers
    }
}

function receiveProducts(products) {
    return {
        type: RECEIVE_PRODUCTS,
        products: products
    }
}

export function fetchTrades(url) {
    return (dispatch) => {
        return fetch(url)
        .then(res => res.json())
        .then(json => {
            dispatch(receiveTrades(json))
        }).catch((err) => {
            console.error(err.message)
        })
    }
}

export function getSummary() {
    return (dispatch, getState) => {
        // do something
        const { auth } = getState();
        const fetch_cfg = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        }
        return fetch(`${apiHost}/api/trades/summary`, fetch_cfg)
                .then( (res) => {
                    if (res.status == 200) {
                        return res.json();
                    } else {
                        console.error("error occured geting summary");
                    }
                }).then( (summary) => {
                    dispatch(receiveSummary(summary));
                })
    }
}

export function getProductSummary(broker, product, term) {
    return (dispatch, getState) => {
        // do something
        const { auth } = getState();
        const fetch_cfg = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        }
        console.log(`start fetching product summary for ${broker}/${product} term=${term}`)
        return fetch(`${apiHost}/api/trades/productSummary?broker=${broker}&product=${product}&term=${term}`, fetch_cfg)
                .then( (res) => {
                    if (res.status == 200) {
                        return res.json();
                    } else {
                        console.error("error occured geting product summary");
                    }
                }).then( (summary) => {
                    dispatch(receiveSummary(summary));
                })
    }
}

export function getBrokers() {
    return (dispatch, getState) => {
        // do something
        const { auth } = getState();
        const fetch_cfg = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        }
        return fetch(`${apiHost}/api/trades/brokers`, fetch_cfg)
                .then( (res) => {
                    if (res.status == 200) {
                        return res.json();
                    } else {
                        console.error("error occured geting summary");
                    }
                }).then( (brokers) => {
                    dispatch(receiveBrokers(brokers));
                })
    }
}

export function getProducts(broker) {
    return (dispatch, getState) => {
        // do something
        const { auth } = getState();
        const fetch_cfg = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        }
        return fetch(`${apiHost}/api/products/${broker}`, fetch_cfg)
                .then( (res) => {
                    if (res.status == 200) {
                        return res.json();
                    } else {
                        console.error("error occured geting products");
                    }
                }).then( (products) => {
                    dispatch(receiveProducts(products));
                })
    }
}
