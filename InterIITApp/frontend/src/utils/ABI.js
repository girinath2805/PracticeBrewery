export const contractABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_patientAddress",
        "type": "address"
      },
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_age",
        "type": "uint256"
      },
      {
        "name": "_gender",
        "type": "string"
      },
      {
        "name": "_medicalCondition",
        "type": "string"
      },
      {
        "name": "_medication",
        "type": "string"
      },
      {
        "name": "_billAmount",
        "type": "uint256"
      }
    ],
    "name": "addPatientRecord",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },

  {
    "constant": false,
    "inputs": [
      {
        "name": "_newAdmin",
        "type": "address"
      }
    ],
    "name": "addAdmin",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "user",
        "type": "address"
      }
    ],
    "name": "isAdmin",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_patientAddress",
        "type": "address"
      }
    ],
    "name": "viewPatientRecord",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "age",
        "type": "uint256"
      },
      {
        "name": "gender",
        "type": "string"
      },
      {
        "name": "medicalCondition",
        "type": "string"
      },
      {
        "name": "medication",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "makePayment",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_patientAddress",
        "type": "address"
      }
    ],
    "name": "getBillAmount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_patientAddress",
        "type": "address"
      }
    ],
    "name": "hasPaidBill",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },

];
