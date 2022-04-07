const Joi = require("joi");
const addrPattern = /^0[xX][a-fA-F0-9]{40}$/;
const ethers = require("ethers");
const ABI = [
  "constructor(string symbol, string name)",
  "function transferFrom(address from, address to, uint value)",
  "event PersonAdded(uint indexed id, tuple(string name, uint16 age) person)",
];
const EventName1 = Joi.object({
  type: Joi.string().required().trim(),
  severity: Joi.string().required().trim(),
});
const EventName2 = Joi.object({
  type: Joi.string().required().trim(),
  severity: Joi.string().required().trim(),
});
const EventName3 = Joi.object({
  type: Joi.string().required().trim(),
  severity: Joi.string().required().trim(),
});
const ethersSchema = Joi.custom((value) => {
  try {
    new ethers.utils.Interface(value);
    return true;
  } catch (_) {
    return false;
  }
});

const adminEvents = {
  developerAbbreviation: "abc",
  protocolName: "abc",
  protocolAbbreviation: "abc",
  contracts: {
    contractName1: {
      address: "0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836",
      abiFile: ABI,
      events: {
        EventName1: {
          type: "Type",
          severity: "Severity",
        },
      },
    },
    contractName2: {
      address: "0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836",
      abiFile: ABI,
      events: {
        EventName2: {
          type: "Type",
          severity: "Severity",
        },
      },
    },
    contractName3: {
      address: "0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836",
      abiFile: ABI,
      events: {
        EventName3: {
          type: "Type",
          severity: "Severity",
        },
      },
    },
  },
};
const eventSchema = Joi.object({
  events: Joi.object().pattern(Joi.string(), Joi.object().concat(EventName1)),
});

const contractName1 = Joi.object({
  abiFile: ethersSchema.required(),
  address: Joi.string().pattern(new RegExp(addrPattern)).required().trim(),
  events: Joi.object().pattern(Joi.string(), Joi.object().concat(EventName1)),
});
const contractName2 = Joi.object({
  abiFile: ethersSchema.required(),
  address: Joi.string().pattern(new RegExp(addrPattern)).required().trim(),
  events: Joi.object().pattern(Joi.string(), Joi.object().concat(EventName2)),
});
const contractName3 = Joi.object({
  abiFile: ethersSchema.required(),
  address: Joi.string().pattern(new RegExp(addrPattern)).required().trim(),
  events: Joi.object().pattern(Joi.string(), Joi.object().concat(EventName3)),
});

const schema = {
  adminEvents: Joi.object({
    developerAbbreviation: Joi.string().required().trim(),
    protocolName: Joi.string().required().trim(),
    protocolAbbreviation: Joi.string().required().trim(),
    contracts: Joi.object().pattern(
      Joi.string(),
      Joi.object()
        .concat(contractName1)
        .concat(contractName2)
        .concat(contractName3)
    ),
  }),
};

const adminEventsResult = schema.adminEvents.validate(adminEvents);

if (adminEventsResult.error) {
  console.log(adminEventsResult.error.details);
} else {
  console.log("Validated Data", adminEventsResult);
}
module.exports = schema;
