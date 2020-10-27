var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static('public'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(5000);