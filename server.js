var express = require('express'),
    app = express(),
    path = require('path')

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/dist/index.html'))
})

app.use(express.static('dist'))

var server = app.listen(3000, function () {
  console.log('Running on port: ' + server.address().port)
})
