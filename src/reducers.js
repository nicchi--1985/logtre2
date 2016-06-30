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
    default:
      return state
  }
}
