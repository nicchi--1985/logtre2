// the entry point for the client app
import 'babel-polyfill'
import React from 'react'
import reducer from './reducers'
import { createStore } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
