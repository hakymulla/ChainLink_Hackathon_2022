// const get_orbit = require('./index')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.EA_PORT || 8080

var server = app.listen();
// server.setTimeout(20000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes  = require('./index')();
app.use("/", routes)

// app.post('/', (req, res) => {
//   console.log('POST Data: ', req.body)
//   console.log(get_orbit)
//     get_orbit(req.body.data.PatientID, (status, result) => {
//     console.log('Result: ', result)
//     res.status(status).json(result)
//   })
// })

app.post("/product",function(req,res)
{
    return res.send({"Message":"Welcome to Node js"});
});
 
app.listen(port, () => console.log(`Listening on port ${port}!`))
