const {create} = require('ipfs')
const {createInstance} = require('orbit-db')
const {spawn} = require('child_process')
console.log(process.cwd())
const orbit_address = "/orbitdb/zdpuAxDBDJPeghLGDfwbFwrXJZJkJ21C6PnitNMfU5tfimzi9/orbit.Bioddata"
const jsonFile = require("./Databases.json");
console.log(jsonFile['Bioddata']);

async function main () {
    const ipfsOptions = { repo : './ipfs', }
    const ipfs = await create(ipfsOptions)
    const orbitdb = await createInstance(ipfs)
    
    // const db2 = await orbitdb.docs(orbit_address)
    // await db2.load()
    const db2 = await orbitdb.open(orbit_address)
    await db2.load()
    // const profile = db2.query((doc) => doc.Age >= 30 & doc.Age <= 75)
    const profile = db2.get("300")
    console.log("Value: ", profile)

    
    await orbitdb.disconnect()
    await ipfs.stop()

    // const profile2 = db2.get(4)
    // console.log("Value: ", profile2)
    // console.log(status)
    // return profile

     // const db2 = await orbitdb.docs(address.toString())
    // await db2.load()
    // const profile = db2.query((doc) => doc.Age >= 30 & doc.Age <= 75)

  }

// main()