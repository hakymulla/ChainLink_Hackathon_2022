// const { Requester, Validator } = require('@chainlink/external-adapter')
var express = require('express');
var router = express.Router();
const {create} = require('ipfs')
const {createInstance} = require('orbit-db')

const jsonFile = require("../Databases.json");
const orbit_address = jsonFile['Bioddata']

async function get_orbit (n) {
    const ipfsOptions = { repo : './ipfs', }
    const ipfs = await create(ipfsOptions);
    
    const orbitdb = await createInstance(ipfs)
  
    const db2 = await orbitdb.docs(orbit_address)
    await db2.load()

    const profile = db2.get(n)

    await orbitdb.disconnect()
    await ipfs.stop()
    console.log("sent")
    console.log("profile[0]:", profile[0])
    return profile[0]
  }

var routes = function () {
      router.route('/')
          .post(function (req, res) {
            console.log("req.body:", req.body.data.PatientID)
            get_orbit(req.body.data.PatientID).then(function(result){
                res.send(result)
              }) 
            })
  
      return router;
  };
  
module.exports = routes;