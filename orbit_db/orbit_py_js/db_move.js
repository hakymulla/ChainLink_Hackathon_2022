const {create} = require('ipfs')
const {createInstance} = require('orbit-db')
const {spawn} = require('child_process')
const { once } = require('events');

async function get_data () {
  let args = ['py_files/postgres.py'];
  var childProcess = spawn('python3', args);

  childProcess.stdout.setEncoding('utf8');

  childProcess.stdout.on('data', (data) => {
    output = JSON.parse(data);
    console.log(`Lenght Node output: ${output.length}`);
  })

  childProcess.stderr.on('data', (err) => {
    console.error(err);
  })
  childProcess.on('exit', () => {
  console.log('The python script has exited');
  })


  await once(childProcess, 'close')

  return output;
}

async function main () {

  const output = await get_data()

    const ipfsOptions = { repo : './ipfs', }
    const ipfs = await create(ipfsOptions)
    //   console.log("IPFS Instance Created!!! ")

    const orbitdb = await createInstance(ipfs)
    //   console.log("OrbitDB Instance Created!!! ")

    const options = {
        // Give write access to everyone
        accessController: {
          write: ['*']
        }
      }
    // const db = await orbitdb.keyvalue('first-database')
    const db = await orbitdb.docs('orbit.patient', { indexBy: 'PatientID' }, options)
    //   console.log("Database Instance Created!!! ")

    const address = db.address
    console.log("Database Address: ", address.toString())

    const identity = db.identity
    // console.log("Database Identity: ", identity.toJSON())

    for (let i=0; i< output.length; i++) {
        await db.put(output[i])
    }
    
    // const db2 = await orbitdb.docs(address.toString())
    // await db2.load()
    const profile = db.get('2')
    // const profile = db2.query((doc) => doc.Age >= 30 & doc.Age <= 75)

    console.log("Value: ", profile)

  }

main()