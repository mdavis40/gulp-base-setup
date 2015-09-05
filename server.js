var express = require('express'),
    app = express(),
    path = require('path'),
    favicon = require('serve-favicon')

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/dist/index.html'))
})

app.use(express.static('dist'))
app.use(favicon(__dirname + '/app/images/favicon.ico'))

var server = app.listen(3000, function () {
  console.log('Running on port: ' + server.address().port)
})
