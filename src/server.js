import 'babel-polyfill'
import path from 'path'
import url from 'url'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import cookie from 'react-cookie'
import { configurateStore } from './store'
import App from './containers/App'
import routes from './routes'

const app = express()
const port = 9501

app.use('/public', express.static(path.join(process.cwd(), 'public')))

function renderFullPage(html) {
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
        <script type="text/javascript" src='/public/bundle.js'></script>
      </body>
    </html>`
  )
}

app.get('*', (req, res, next) => {
  global.navigator = { userAgent: req.headers['user-agent'] };
  console.log("start handling req...")
  cookie.plugToRequest(req, res);
  match({routes, location:req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store = configurateStore();
      const html = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>)
      res.status(200).send(renderFullPage(html));
    } else {
      console.error('not found')
      console.error(req.url)
      res.status(404).send('Not found')
    }
  })
})

app.listen(port, () => {
  console.log(`app listening on port ${port} ...`)
});
