var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static('public'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

const timestampHandler = (req, res) => {
  let d = new Date(Number(req.params.date))
  if (!isValidDate(d)) d = new Date(req.params.date)
  if (!isValidDate(d)) d = new Date()

  res.json({unix: d.valueOf(), utc: d.toUTCString()})
}

app.get('/api/timestamp/', timestampHandler)
app.get('/api/timestamp/:date', timestampHandler)
app.listen(5000);