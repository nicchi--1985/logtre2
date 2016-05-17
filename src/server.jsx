import express from 'express'
const app = express()

app.get('/', function(req, res) {
  console.log(req.headers);
  res.send(`
    <html>
      <body>
        <h1>logtre</h1>
        <form action="http://${req.headers.host}/api/import" method="POST" enctype="multipart/form-data">
          <input type='file' name='file'>
          <input type='submit' value='submit'>
        </form>
      </body>
    </html>
    `);
});

app.listen(3000, function() {
  console.log('app listening on port 3000 ...')
});
