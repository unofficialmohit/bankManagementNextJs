export const contractAddress = "0x07ADaC927176D18C16dabc5106230348395b792B";
export const contractABI = [
  {
    inputs: [],
    name: "addLoanFund",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "createAccount",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "month",
        type: "uint256",
      },
    ],
    name: "getCarLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "month",
        type: "uint256",
      },
    ],
    name: "getEducationLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "month",
        type: "uint256",
      },
    ],
    name: "getHomeLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "payCarEmi",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "payEducationEmi",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "payHomeEmi",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "username",
        type: "address",
      },
    ],
    name: "transferMoney",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "money",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "money",
        type: "uint256",
      },
    ],
    name: "withdrawLoanFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "displayUserDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "UserID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "Accountbalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "HomeLoan",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "HomeEmiCost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "HomeEmiLeft",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "CarLoan",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "CarEmiCost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "CarEmiLeft",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "EducationLoan",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "EducationEmiCost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "EducationEmiLeft",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLoanFund",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAccounts",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];