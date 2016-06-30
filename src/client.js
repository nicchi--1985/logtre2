// the entry point for the client app
import 'babel-polyfill'
import React from 'react'
import { configurateStore } from './store'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'

const store = configurateStore();
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
)
