//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract BHealth is ChainlinkClient {
    using Chainlink for Chainlink.Request;
    
    bytes32 patientspecId = "8fd4051a3c1144ae84cd502112f565dd";
    bytes32 prescspecId = "d5adaa3f68284bc982a81e4d022aa789";

    mapping(address => string[])  physicianPatientsMap;

    address[] physicians;

    struct PatientStruct {
        uint256  id;
        uint256  age;
        string  first;
        string  last;
        string  location;
        string  email;
    }

    struct PrescriptionStruct {
        uint256  id;
        uint256  physicianid;
        string  medication;
        uint256  date;
        uint256  appointment;
        uint256  dose;
    }

    modifier onlyPhysician(string memory _patientid) {
        bool value;
        string[] memory patients = new string[](physicianPatientsMap[msg.sender].length);
        patients = physicianPatientsMap[msg.sender];
        for (uint i = 0; i < patients.length; i++) {
            // if (patients[i] == _patientid) 
            if (keccak256(bytes(patients[i])) == keccak256(bytes(_patientid))){
                value = true;
            }
        }
        require(value == true);
        _;
    }


    PatientStruct CurrPatient;
    PrescriptionStruct CurrPrescription;

    // 0x01BE23585060835E02B77ef475b0Cc51aA1e0709
    // 0x230C6db69f63F73361015Ef1e417f0CBBc89518d
    constructor( address _chainlinkToken, address _chainlinkOracle) {
        setChainlinkToken(_chainlinkToken);
        setChainlinkOracle(_chainlinkOracle);
    }

    function requestPatientData(string memory _patientid) public onlyPhysician(_patientid)
    {
        
        uint256 payment = 100000000000000000;
        Chainlink.Request memory req = buildChainlinkRequest(patientspecId, address(this), this.fulfillPatient.selector);
        req.add("PatientID", _patientid);
        sendOperatorRequest(req, payment);
    }


    function fulfillPatient( bytes32 requestId, uint256 _id, uint256 _age, string memory _first, 
                            string memory _last, string memory _location, string memory _email) public
        recordChainlinkFulfillment(requestId)
    {
        // emit RequestFulfilled(requestId, id, age, first, last, location, email);
        CurrPatient = PatientStruct(_id, _age,_first, _last, _location, _email);
    }

    function getPatienttruct() public view returns (uint256, uint256, string memory, string memory,string memory,string memory){
            return(CurrPatient.id, CurrPatient.age, CurrPatient.first, CurrPatient.last, CurrPatient.location, CurrPatient.email);
        }

    function requestPrescriptionData(string memory _patientid) public
    {
        uint256 payment = 100000000000000000;
        Chainlink.Request memory req = buildChainlinkRequest(prescspecId, address(this), this.fulfillPrescription.selector);
        req.add("PatientID", _patientid);
        sendOperatorRequest(req, payment);
    }

    function fulfillPrescription( bytes32 requestId,uint256 _id, uint256 _physicianid, string memory _medication, 
                                uint256 _date, uint256 _appointment, uint256 _dose) public
        recordChainlinkFulfillment(requestId)
    {
        CurrPrescription = PrescriptionStruct(_id, _physicianid, _medication, _date, _appointment, _dose);
    }

    function getPrescriptiontruct() public view returns (uint256, uint256, string memory, uint256, uint256, uint256){
            return(CurrPrescription.id, CurrPrescription.physicianid, CurrPrescription.medication, CurrPrescription.date, CurrPrescription.appointment, CurrPrescription.dose);
        }

    function addPhysician(address _addr) public {
        physicians.push(_addr);
    }

    function removePhysician(address _addr) public {
        for (uint i = 0; i < physicians.length - 1; i++) {
            if (physicians[i] == _addr){
                for (uint j = i; j < physicians.length - 1; j++){
                    physicians[j] = physicians[j + 1];
                }
                physicians.pop();
                
            }
        }
    }

    function getPhysicians() public view returns (address[] memory) {
        return physicians;
    }

    function getPhysicianPatients(address _addr) public view returns (string[] memory) {
        return physicianPatientsMap[_addr];
    }

    function setPhysicianByPateint(address _addr, string memory _patientid) public{
        uint count = physicianPatientsMap[_addr].length;
        if (count == 0){
            physicianPatientsMap[_addr].push(_patientid);
        }
        else {
            string[] memory patients = new string[](count);
            patients = physicianPatientsMap[_addr];
            for (uint i = 0; i < patients.length; i++) {
            if (keccak256(bytes(patients[i])) == keccak256(bytes(_patientid))){
                revert();
            }
            else{
                physicianPatientsMap[_addr].push(_patientid);
            }
        }
        }           
    }
}