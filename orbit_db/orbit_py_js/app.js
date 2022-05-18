const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.EA_PORT || 8080

var server = app.listen();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes  = require('./api/patient')();
app.use("/patient", routes)

var routes  = require('./api/physician')();
app.use("/physician", routes)

var routes  = require('./api/prescription')();
app.use("/prescription", routes)
 
app.listen(port, () => console.log(`Listening on port ${port}!`))
