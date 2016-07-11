import cookie from 'react-cookie'
import { base_host } from '../routes'

const apiHost = "http://local.logtre.com:8888"

// サーバから取引データを取得
export function fetchTrades(url) {
    return (dispatch) => {
        return fetch(url)
        .then(res => res.json())
        .then(json => {
            dispatch(receiveTrades(json))
        }).catch((err) => {
            console.log(err.message)
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
            console.log("got response for fbAuth")
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
                    console.log('error occured');
                    console.log(err);
                })
    }
}

export function uploadCSVFile(payload) {
    return (dispatch, getState) => {
        const { auth } = getState();
        const body = new FormData();
        body.append("stockComp", payload.stockComp);
        body.append("file", payload.upFile, payload.upFile.name);
        const fetch_cfg = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            },
            body: body
        }
        return fetch(`${apiHost}/api/import`, fetch_cfg)
                .then((res) => {
                    if (res.status == "200") {
                        console.log("upload success");
                    } else {
                        console.log("error occured uploading file")
                    }
                })
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
                        console.log("error occured geting summary");
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
                        console.log("error occured geting summary");
                    }
                }).then( (brokers) => {
                    console.log(brokers);
                    dispatch(receiveBrokers(brokers));
                })
    }
}