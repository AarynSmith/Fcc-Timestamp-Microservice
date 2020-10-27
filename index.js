var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors({optionSuccessStatus: 200}));

app.use(express.static('public'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

const timestampHandler = (req, res) => {
  let d
  if (req.params.date) {
    d = new Date(Number(req.params.date))
    if (!isValidDate(d)) d = new Date(req.params.date)
    if (!isValidDate(d)) {
      return res.json({error: "Invalid Date"})
    }
  } else d = new Date()
  res.json({unix: d.valueOf(), utc: d.toUTCString()})
}

app.get('/api/timestamp/', timestampHandler)
app.get('/api/timestamp/:date', timestampHandler)
app.listen(5000);