const {network} = require("hardhat")
const LINK = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
const OWNER = "0x6066484DE209A9db68d09Ce6241C38E27Baa9143"
const NODE = "0xD174782AaE234703d0DA746f555652fB3894a623"


async function main() {

    const Operator = await hre.ethers.getContractFactory("Operator");
    const operator = await Operator.deploy(LINK, OWNER);
    await operator.deployed();
    console.log("Operator deployed to:", operator.address);

    console.log("Setting Authorized Senders", NODE)
    await operator.setAuthorizedSenders([NODE])
    console.log("DONE")
    
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });