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

export function storeToken(token) {
    return {
        type: "AUTH_SUCCEEDED",
        token: token
    }
}

export function successAuthentication(token) {
    return {
        type: "AUTH_SUCCEEDED",
        token: token
    }
}
