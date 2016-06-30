import cookie from 'react-cookie'
import { base_host } from '../routes'

// サーバから取引データを取得
export function fetchTrades(url) {
    return (dispatch) => {
        return fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log("response received!!")
            console.log(json)
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

/* 取引データを取得してstateに加える
fetch(http://api/trades).then(res=>dispatch(receiveTrades(res)))
*/

// facebookAuth
export function authWithFacebook(url) {
    return (dispatch) => {
        const config = {}
        return fetch(url, config)
        .then(res => {
            console.log("got response for fbAuth")
            console.log(res)
            console.log(res.json())
            return res.json()
        })
        .then(token => {
            console.log(token)
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
        return fetch('http://local.logtre.com:8888/api/me', fetch_cfg)
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
