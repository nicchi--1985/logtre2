const initial_state = {trades: []}

export default function reducer(state=initial_state, action) {
  switch (action.type) {
    case 'GET_TRADES':
      new_state = {trades: action.payload.trades}
      return new_state
    default:
      return state
  }
}
