const {create} = require('ipfs')
const {createInstance} = require('orbit-db')
var pg = require("pg");
const fs = require('fs')

const databases = {}

var connstr = "postgresql://healthdata:healthdata@localhost:5433/healthdatabase"

var client = new pg.Client(connstr)

const tables = {
  "Bioddata": 'PatientID',
  "Physician": 'PhysicianID',
  "Prescription": "PatientID"
}

async function main () {
  const ipfsOptions = { repo : './ipfs', }
  const ipfs = await create(ipfsOptions)
  console.log("IPFS Instance Created!!! ")

  const orbitdb = await createInstance(ipfs)
  console.log("OrbitDB Instance Created!!! ")

  const options = {
      // Give write access to everyone
      accessController: {
        write: ['*']
      }
    }
    
  client.connect()

  for (const key in tables) {
    console.log(`${key}: ${tables[key]}`);
   

    const db = await orbitdb.docs(`orbit.${key}`, { indexBy: `${tables[key]}` }, options)
    console.log("Database Instance Created!!! ")

    const address = db.address
    console.log(`${key} Database Address: `, address.toString())

    const identity = db.identity
    console.log("Database Identity: ", identity.toJSON())

    const query = await client.query(`SELECT * FROM public."${key}"`)
    const all_rows = await query.rows

    for (let i=0; i< all_rows.length; i++) {
      await db.put(all_rows[i])
      }

    databases[key] = address.toString()
  }
   await client.end()

  fs.writeFile('Databases.json', JSON.stringify(databases), (err) => {
    if (err) throw err;
  })

  console.log(databases)
  await orbitdb.disconnect()
  await ipfs.stop()
}
main()