import path from 'path'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import reducer from './reducers'
import App from './containers/App'
import routes from './routes'

const app = express()
const port = 9001

console.log(path.join(__dirname, 'public'))
app.use(express.static('public'))

function renderFullPage(html, preloadedState=null) {
  return(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>logtre</title>
        <meta name="description" content="Get started with React.">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <!-- Place favicon.ico in the root directory -->
      </head>
      <body>
        <div id="root">${html}</div>
        <script src='client/bundle.js'></script>
      </body>
    </html>`
  )
}

app.get('*', (req, res, next) => {
  console.log("start handling req...")
  match({routes, location:req.url}, (error, redirectLocation, renderProps) => {
    console.log(renderProps)
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store = createStore(reducer)
      const html = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>)
      res.status(200).send(renderFullPage(html))
    } else {
      res.status(404).send('Not found')
    }
  })
})

function handleRender(error, redirectLocation, renderProps) {
  
  
  /*const store = createStore(reducer)
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const preloadedState = store.getState()
  res.send(renderFullPage(html, preloadedState))*/
}

app.listen(port, () => {
  console.log('app listening on port 9001 ...')
});
