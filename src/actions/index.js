// サーバからuserに紐づく取引データを取得
export function getTrades() {
    return {type: "GET_TRADES"}
}