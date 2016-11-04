import cookie from 'react-cookie'
import { base_host } from '../routes'

const apiHost = "http://local.logtre.com"

// サーバから取引データを取得
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

// サーバから受信した取引データをstateに加える
export function receiveTrades(data) {
    return {
        type: "RECEIVE_TRADES",
        payload: data
    }
}

// facebookAuth
export function authWithFacebook(url) {
    return (dispatch) => {
        const config = {}
        return fetch(url, config)
        .then(res => {
            return res.json()
        })
        .then(token => {
            dispatch(storeToken(token))
        }).catch(err => console.log(err))
    }
}

function storeToken(token) {
    return {
        type: "SET_TOKEN",
        token: token
    }
}

function storeUser(user) {
    return {
        type: "SET_USER",
        payload: user
    }
}

export function successAuthentication(token) {
    return (dispatch) => {
        dispatch(storeToken(token));
        const fetch_cfg = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        console.log('going to fetch user info');
        return fetch(`${apiHost}/api/me`, fetch_cfg)
                .then((res) => {
                    return res.json();
                })
                .then((user) => {
                    dispatch(storeUser(user));
                })
                .catch((err) => {
                    console.error('error occured');
                    console.error(err);
                })
    }
}

export function uploadCSVFile(payload) {
    return (dispatch, getState) => {
        const { auth } = getState();
        const body = new FormData();
        body.append("broker", payload.broker);
        body.append("file", payload.file, payload.file.name);
        const fetch_cfg = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            },
            body: body
        }
        dispatch(startUploadCSV())
        return fetch(`${apiHost}/api/import`, fetch_cfg)
                .then((res) => {
                    if (res.status == "200") {
                        console.log("upload success");
                        dispatch(successUploadCSV("正常に取引履歴をアップロードしました"))
                    } else {
                        console.error("error occured uploading file")
                    }
                })
    }
}

function startUploadCSV() {
    return {
        type: 'START_UPLOAD_FORM'
    }
}

function successUploadCSV(success_msg) {
    return {
        type: "SUCCESS_UPLOAD_FORM",
        msg: success_msg
    }
}

export function changeUploadForm(uploadForm) {
    return {
        type: "CHANGE_UPLOAD_FORM",
        uploadForm: uploadForm
    }
}

function receiveSummary(summary) {
    return {
        type: "RECEIVE_SUMMARY",
        summary: summary
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

function receiveBrokers(brokers) {
    return {
        type: "RECEIVE_BROKERS",
        brokers: brokers
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
        console.log("start fetching brokers")
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

function receiveProducts(products) {
    return {
        type: "RECEIVE_PRODUCTS",
        products: products
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
        console.log("start fetching products")
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

function receiveChartData(data) {
    return {
        type: "RECEIVE_CHARTDATA",
        payload: data
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

export function countupChartDataTerm() {
    return {
        type: "COUNTUP_CHARTDATA_TERM"
    }
}

export function countdownChartDataTerm() {
    return {
        type: "COUNTDOWN_CHARTDATA_TERM"
    }
}

function receiveRadarData(data) {
    return {
        type: "RECEIVE_RADARDATA",
        payload: data
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
