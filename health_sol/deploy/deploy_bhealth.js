const {network} = require("hardhat")
const LINK = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
const OWNER = "0x6066484DE209A9db68d09Ce6241C38E27Baa9143"
const OPERATOR = "0xE3Fe71A798B5C5E8AdcF930E3Be6EE1D53B5Cb7c"


async function main() {

    const BHealth = await hre.ethers.getContractFactory("BHealth");
    const bHealth = await BHealth.deploy(LINK, OPERATOR);
    await bHealth.deployed();
    console.log("BHEALTH deployed to:", bHealth.address);
  }
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});