import path from 'path'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './containers/App'

const app = express()
const port = 9001

console.log(path.join(__dirname, 'public'))
app.use(express.static('public'))
app.use(handleRender)

function renderFullPage(html, preloadedState) {
  return(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>logtre</title>
      </head>
      <body>
        <h1>logtre</h1>
        <div id="root">${html}</div>
        <form action="http://local.logtre.com:3000/api/import" method="POST" enctype="multipart/form-data">
          <input type='file' name='file' />
          <input type='submit' value='submit' />
        </form>
        <script src='client/bundle.js'></script>
      </body>
    </html>`
  )
}

function handleRender(req, res) {
  console.log("start handling req...")
  const store = createStore(reducer)
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const preloadedState = store.getState()
  res.send(renderFullPage(html, preloadedState))
}

app.listen(port, () => {
  console.log('app listening on port 9001 ...')
});
