const { expect } = require("chai");
const { ethers } = require("hardhat");
const contractAddress = "0x4B7657ee84d5dD8945B8154bCa09faAB37c643e9"
const BHealth  = require('../artifacts/contracts/Health.sol/BHealth.json');

describe("BHealth", function () {
    let bhealth;
    // beforeEach(async () => {
    //     const [owner, alice, _] = await ethers.getSigners()
    //     const bhealth = new ethers.Contract(
    //       contractAddress,
    //       BHealth.abi,
    //       owner
    // );      
    // });

    it("Send Message Hash to the contract", async function () {
      let patiendid = 20;
      const [owner, alice, _] = await ethers.getSigners()
      const bhealth = new ethers.Contract(
        contractAddress,
        BHealth.abi,
        owner
    );   


    // tx = {
    //   to: contractAddress,
    //   value: ethers.utils.parseEther('0.1', 'LINK')
    // };
    // const transaction = await owner.sendTransaction(tx);   
    // const params = { to: contractAddress, value: ethers.utils.parseUnits("0.1", "link").toHexString()};
    // const txHash = await owner.sendTransaction(params);

      const health = await bhealth.requestPatientData(patiendid)
      await health.wait()
      
      const[id, age,first, last, location, email] = await bhealth.getPatienttruct()
      console.log(id, age,first, last, location, email)

      // expect(id).to.equal(0);
      // expect(age).to.equal(0);
      // expect(first).to.equal("");
      // expect(last).to.equal("");
      // expect(location).to.equal("");
      // expect(email).to.equal("");

    });
  
});