const initial_state = {trades: [{id:"1",name:"first"},{id:"2",name:"second"},{id:"3",name:"third"}]}

export default function reducer(state=initial_state, action) {
  switch (action.type) {
    case 'RECEIVE_TRADES':
      const new_state = Object.assign(
        {}, 
        state,
        {trades: action.payload}
      )
      return new_state
    default:
      return state
  }
}
