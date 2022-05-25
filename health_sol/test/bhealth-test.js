const { expect } = require("chai");
const { ethers } = require("hardhat");
const contractAddress = "0x7fd2952f9C6624b0fd28e8a67B1004D55e0Da418"
const BHealth  = require('../artifacts/contracts/Health.sol/BHealth.json');

describe("BHealth", function () {
  // this.timeout(30000);
   

    let bhealth;
    // beforeEach(async () => {
    //     const [owner, alice, _] = await ethers.getSigners()
    //     const bhealth = new ethers.Contract(
    //       contractAddress,
    //       BHealth.abi,
    //       owner
    // );      
    // });

    // it("Set Physicians by patients", async function () {
    //   let patiendid = "100";
    //   let patiendid1 = "200";
    //   let patiendid2 = "20";
    //   const [owner, alice, _] = await ethers.getSigners()
    //   const bhealth = new ethers.Contract(
    //     contractAddress,
    //     BHealth.abi,
    //     owner
    // );   
     
    //   // await bhealth.setPhysicianByPateint("0x6066484DE209A9db68d09Ce6241C38E27Baa9143", patiendid)
    //   // await bhealth.setPhysicianByPateint("0x6066484DE209A9db68d09Ce6241C38E27Baa9143", patiendid1)
    //   // await bhealth.setPhysicianByPateint("0x6066484DE209A9db68d09Ce6241C38E27Baa9143", patiendid2)

    //   const patients = await bhealth.getPhysicianPatients((owner.address))

    //   expect(patients[0]).to.equal(patiendid);
    //   expect(patients[1]).to.equal(patiendid1);
    //   expect(patients[2]).to.equal(patiendid2);
    // });

    // it("Physicians request patient data", async function (done) {
    //   this.timeout(60000);
    //   let patiendid = 20;
    //   const [owner, alice, _] = await ethers.getSigners()
    //   const bhealth = new ethers.Contract(
    //     contractAddress,
    //     BHealth.abi,
    //     owner
    // );   

    //   await bhealth.requestPatientData("100")

    //   // const[id, age,first, last, location, email] = await bhealth.getPatienttruct()
    //   // console.log(id, age,first, last, location, email)

    //   setTimeout(done, 60);

    // });

    it("Physicians request patient data", async function () {
      let patiendid = 20;
      const [owner, alice, _] = await ethers.getSigners()
      const bhealth = new ethers.Contract(
        contractAddress,
        BHealth.abi,
        owner
    );   

      const[id, age,first, last, location, email] = await bhealth.getPatienttruct()
      console.log(id, age,first, last, location, email)


      // expect(age.value).to.equal(100);
      expect(first).to.equal("Ayden");
      expect(last).to.equal("Sylvio");
      expect(location).to.equal("Maine");
      expect(email).to.equal("ayden@gmail.com");

    });

});