const Joi = require("joi");
const { ethers } = require("ethers");
const addrPattern = /^0[xX][a-fA-F0-9]{40}$/;
const expPattern = /^0[xX](?!0+$)[a-fA-F0-9]{40}$/;
const multiplier = 60 * 60 * 1000;
const abiJson = {};

const schema = {
  accountBalance: Joi.object().keys({
    developerAbbreviation: Joi.string().required(),
    protocolName: Joi.string().optional(),
    protocolAbbreviation: Joi.string().optional(),
    address: Joi.string().pattern(new RegExp(addrPattern)).required(),
    thresholdEth: Joi.number(),
    alertMinimumIntervalSeconds: Joi.date().required(),
    type: Joi.string().required(),
    severity: Joi.string().required(),
  }),
  adminEvents: Joi.object().keys({
    abiFile: Joi.object().required(),
    address: Joi.string().pattern(new RegExp(addrPattern)).required(),
    expression: Joi.any().when("address", {
      is: expPattern,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    developerAbbreviation: Joi.string().required(),
    protocolName: Joi.string().required(),
    protocolAbbreviation: Joi.string().required(),
    proxy: Joi.string().alphanum().required(),
    type: Joi.string().required(),
    severity: Joi.string().required(),
  }),
  monitorFunctionCalls: Joi.object().keys({
    abiFile: Joi.object().required(),
    developerAbbreviation: Joi.string().required(),
    protocolName: Joi.string().required(),
    protocolAbbreviation: Joi.string().required(),
    address: Joi.string().pattern(new RegExp(addrPattern)).required(),
    expression: Joi.any()
      .when("address", {
        is: expPattern,
        then: Joi.required(),
        otherwise: Joi.optional(),
      })
      .optional(),
    type: Joi.string().required(),
    severity: Joi.string().required(),
  }),
};

const accountBalance = {
  developerAbbreviation: "",
  protocolName: "",
  protocolAbbreviation: "",
  address: "",
  thresholdEth: 0,
  type: "Type",
  severity: "Severity",
  alertMinimumIntervalSeconds: 86400,
};
const adminEvents = {
  developerAbbreviation: "",
  protocolName: "",
  protocolAbbreviation: "",
  expression: expPattern,
  type: "Type",
  severity: "Severity",
  address: "contractAddress1",
  abiFile: "filename1.json",
  proxy: "contractName2",
};
const monitorFunctionCalls = {
  developerAbbreviation: "",
  protocolName: "",
  protocolAbbreviation: "",
  address: "contractAddress1",
  abiFile: "contractAbiFileName1.json",
  expression: "7000",
  type: "Type",
  severity: "Severity",
};

const accountBalanceResult = schema.accountBalance.validate(accountBalance);
const adminEventsResult = schema.adminEvents.validate(adminEvents);
const monitorFunctionCallsResult =
  schema.monitorFunctionCalls.validate(monitorFunctionCalls);

if (result.error) {
  console.log(result.error.details);
} else {
  console.log("Validated Data", result);
}
module.exports = schema;
