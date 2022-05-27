const schema = require("./schema");

const json = {
  abi: {
    abi1: ["function transferFrom(address from, address to, uint value)"],
    abi2: [
      "event Transfer(address indexed from, address indexed to, address value)",
    ],
    abi3: ["constructor(string symbol, string name)"],
  },
  config: {
    developerAbbreviation: "UNI",
    protocolName: "Uniswap",
    protocolAbbreviation: "UNI",
    contracts: {
      contractName1: {
        abiFile: "abi2",
        address: "  0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836",
        events: {
          event1: {
            type: "Info",
            severity: "Low",
            expression: "amount > 3",
          },
          event2: {
            type: "Info",
            severity: "High",
          },
        },
        proxy: "contractName1",
      },
      contractName2: {
        abiFile: "abi1",
        address: " 0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836",
        events: {
          event1: {
            type: "Info",
            severity: "Medium",
          },
        },
      },
    },
  },
};

console.log(schema.validate(json));
