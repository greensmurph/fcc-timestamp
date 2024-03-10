// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const isDateValid = (dateStr) => !isNaN(new Date(dateStr));
  const isValidUTC = isDateValid(req.params.date);
  const isValidUnix = isDateValid(Number(req.params.date));
  let response = {};

  if (isValidUTC) {
    response.unix = new Date(req.params.date).getTime();
    response.utc = new Date(req.params.date).toUTCString();
  } else if (isValidUnix) {
    response.unix = new Date(Number(req.params.date)).getTime();
    response.utc = new Date(Number(req.params.date)).toUTCString();
  } else {
    response.error = "Invalid Date";
  }

  res.json(response)
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
