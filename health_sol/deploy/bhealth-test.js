const { expect } = require("chai");
const { ethers } = require("hardhat");
const contractAddress = "0x4B7657ee84d5dD8945B8154bCa09faAB37c643e9"
const BHealth  = require('../artifacts/contracts/Health.sol/BHealth.json');

async function main() {

    const [owner, alice, _] = await ethers.getSigners()
    console.log(owner.address);
    console.log(alice.address);
  }
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});


// describe("Message", function () {
//     let bhealth;
//     beforeEach(async () => {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner(accounts[0]);
//         const contract = new ethers.Contract(
//             contractAddress,
//             BHealth.abi,
//             signer
//         );
//         console.log(contract.getPhysicians())

//     });
// });