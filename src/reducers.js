const initial_state = {
  trades: [{id:"1",name:"first"},{id:"2",name:"second"},{id:"3",name:"third"}],
  auth: {token: null, username: null}
}

export default function reducer(state=initial_state, action) {
  switch (action.type) {
    case 'RECEIVE_TRADES':
      return Object.assign({}, state, {
        trades: action.payload
      })
    case 'AUTH_SUCCEEDED':
      console.log('storing token');
      const newstate = Object.assign({}, state, {
        auth: {token: action.token, username: "success"}
      })
      return newstate
    default:
      return state
  }
}
