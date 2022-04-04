const Joi = require("joi");
const { ethers } = require("ethers");
const addrPattern = /^0[xX][a-fA-F0-9]{40}$/;
const expPattern = /^0[xX](?!0+$)[a-fA-F0-9]{40}$/;

// const ABI = [
//   {
//     type: "constructor",
//     payable: false,
//     inputs: [
//       { type: "string", name: "symbol" },
//       { type: "string", name: "name" },
//     ],
//   },
// ];

// console.log(typeof abiFile);
// const unixTimestampSchema = Joi.number()
//   .required()
//   .strict()
//   .$.integer()
//   .min(0)
//   .max(2147483648)
//   .rule({ message: '"{{#label}}" must be a valid unix timestamp' });
// const jsTimestamp = Date.now();

const schema = {
  accountBalance: Joi.object().keys({
    developerAbbreviation: Joi.string().required(),
    protocolName: Joi.string().allow(null, ""),
    protocolAbbreviation: Joi.string().allow(null, ""),
    address: Joi.string().pattern(new RegExp(addrPattern)).required(),
    thresholdEth: Joi.number(),
    // alertMinimumIntervalSeconds: jsTimestamp,
    type: Joi.string().required(),
    severity: Joi.string().required(),
  }),

  adminEvents: Joi.object().keys({
    //abiFile: ethers.utils.Interface(ABI),
    address: Joi.string().pattern(new RegExp(addrPattern)).required(),
    expression: Joi.string()
      .invalid(null, false, 0, "")
      .required()
      .when("address", {
        is: expPattern,
        then: Joi.forbidden(),
      }),
    developerAbbreviation: Joi.string().required(),
    protocolName: Joi.string().required(),
    protocolAbbreviation: Joi.string().required(),
    proxy: Joi.string().alphanum().required(),
    type: Joi.string().required(),
    severity: Joi.string().required(),
  }),

  monitorFunctionCalls: Joi.object().keys({
    //abiFile: ethers.utils.Interface(ABI),
    developerAbbreviation: Joi.string().required(),
    protocolName: Joi.string().required(),
    protocolAbbreviation: Joi.string().required(),
    address: Joi.string().pattern(new RegExp(addrPattern)).required(),
    //expression:""

    type: Joi.string().required(),
    severity: Joi.string().required(),
  }),
};

const accountBalance = {
  developerAbbreviation: "UNI",
  protocolName: "",
  protocolAbbreviation: "",
  address: "0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836",
  thresholdEth: 5,
  type: "Type",
  severity: "Severity",
  //alertMinimumIntervalSeconds: ,
};

const adminEvents = {
  //abiFile: ABI,
  address: "0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836",
  developerAbbreviation: "SUSH",
  protocolName: "SushiSwap",
  protocolAbbreviation: "SUSH",
  type: "Type",
  severity: "Severity",
  proxy: "contractName2",
};

const monitorFunctionCalls = {
  //abiFile: ABI,
  developerAbbreviation: "UN",
  protocolName: "Uniswap",
  protocolAbbreviation: "UNI",
  address: "0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836",

  type: "Type",

  severity: "Severity",
};

const accountBalanceResult = schema.accountBalance.validate(accountBalance);
const adminEventsResult = schema.adminEvents.validate(adminEvents);
const monitorFunctionCallsResult =
  schema.monitorFunctionCalls.validate(monitorFunctionCalls);

if (monitorFunctionCallsResult.error) {
  console.log(monitorFunctionCallsResult.error.details);
} else {
  console.log("Validated Data", monitorFunctionCallsResult);
}
module.exports = schema;
