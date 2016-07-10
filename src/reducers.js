const initial_state = {
  trades: [{id:"1",name:"first"},{id:"2",name:"second"},{id:"3",name:"third"}],
  auth: {token: null, username: null},
  performanceSummary: {gain_loss: null, roi: null, trade_count: null}
}

export default function reducer(state=initial_state, action) {
  switch (action.type) {
    case 'RECEIVE_TRADES':
      return Object.assign({}, state, {
        trades: action.payload
      })
    case 'SET_TOKEN':
      console.log('storing token');
      return Object.assign({}, state, {
        auth: {token: action.token, username: "success"}
      })
    case 'SET_USER':
      console.log('set user info');
      return Object.assign({}, state, {
        user: {
          id: action.payload.id,
          name: action.payload.name
        }
      })
    case "RECEIVE_SUMMARY":
      return Object.assign({}, state, {
        performanceSummary: action.summary
      })
    default:
      return state
  }
}
