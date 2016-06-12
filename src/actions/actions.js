// サーバから取引データを取得
export function fetchTrades() {
    return (dispatch) => {
        return fetch("http://local.logtre.com:8082/api/trades/index")
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