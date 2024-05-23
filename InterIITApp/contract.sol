// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthCare{
    struct Patient {
        string name;
        uint256 age; // Patient's age
        string gender; // Patient's gender
        string medicalCondition; // Medical condition or diagnosis
        string medication; // Medication prescribed
    }

    mapping(address => Patient) public patients;
    mapping(address => bool) public administrators;
    mapping(address => bool) public paidBills; // Mapping to track bill payments
    mapping(address => uint256) public billAmounts; // New mapping to store bill amounts
    address payable public hospital;

    constructor() {
        hospital = payable(msg.sender);
        administrators[msg.sender] = true;
    }
    modifier onlyAdmin() {
        require(administrators[msg.sender] == true, "Only an administrator can perform this action");
        _;
    }

    function addPatientRecord(address _patientAddress, string memory _name, uint256 _age, string memory _gender, string memory _medicalCondition, string memory _medication, uint256 _billAmount) public onlyAdmin {
        Patient memory newPatient = Patient(_name, _age, _gender, _medicalCondition, _medication);
        patients[_patientAddress] = newPatient;
        paidBills[_patientAddress] = false; // Initialize bill status as unpaid
        billAmounts[_patientAddress] = _billAmount; // Set the bill amount
    }

    function viewPatientRecord(address _patientAddress) public view returns (string memory name, uint256 age, string memory gender, string memory medicalCondition, string memory medication) {
        return (patients[_patientAddress].name, patients[_patientAddress].age, patients[_patientAddress].gender, patients[_patientAddress].medicalCondition, patients[_patientAddress].medication);
    }

    function makePayment() public payable {
        require(msg.value == billAmounts[msg.sender], "Please pay the exact bill amount"); // Check the payment amount
        hospital.transfer(msg.value);
        paidBills[msg.sender] = true; // Mark the bill as paid
    }

    function hasPaidBill(address _patientAddress) public view returns (bool) {
        return paidBills[_patientAddress]; // Check if the bill is paid
    }

    function getBillAmount(address _patientAddress) public view returns (uint256) {
        return billAmounts[_patientAddress]; // Get the bill amount
    }

    function addAdmin(address _newAdmin) public onlyAdmin {
        administrators[_newAdmin] = true;
    }

    function isAdmin(address user) public view returns (bool) {
        return administrators[user];
    }
}
