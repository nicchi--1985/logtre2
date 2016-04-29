import express from 'express'
const app = express()


app.get('/', function(req, res) {
  console.log('got request')
  res.send(`<html><body>Hello world</body></html>`);
});

app.listen(3000, function() {
  console.log('app listening on port 3000 ...')
});
