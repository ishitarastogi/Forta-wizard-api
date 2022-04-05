const Joi = require("joi");
const addrPattern = /^0[xX][a-fA-F0-9]{40}$/;
const expPattern = /^0[xX](?!0+$)[a-fA-F0-9]{40}$/;

const eventSchema = {
  type: Joi.string().required(),
  name: Joi.string().required,
  inputs: Joi.array().items(
    Joi.object({
      name: Joi.string().required,
      type: Joi.string().required(),
      indexed: Joi.boolean().required(),
    })
  ),
  anonymous: Joi.boolean().required(),
};

const functionSchema = {
  type: Joi.string().required(),
  name: Joi.string().required,
  inputs: Joi.array().items(
    Joi.object({
      name: Joi.string().required,
      type: Joi.string().alphanum().required(),
      indexed: Joi.boolean().optional(),
    })
  ),
  anonymous: Joi.boolean().required(),
  outputs: Joi.array().items(
    Joi.object({
      name: Joi.string().required,
      type: Joi.string().alphanum(),
      payable: Joi.boolean(),
    })
  ),
};

const constructorSchema = {
  stateMutability: Joi.string(),
  type: Joi.string(),
};

const schema = {
  accountBalance: Joi.object().keys({
    developerAbbreviation: Joi.string().required(),
    protocolName: Joi.string().allow(null, ""),
    protocolAbbreviation: Joi.string().allow(null, ""),
    address: Joi.string().pattern(new RegExp(addrPattern)).required(),
    thresholdEth: Joi.number(),
    alertMinimumIntervalSeconds: Joi.number().required(),
    type: Joi.string().required(),
    severity: Joi.string().required(),
  }),

  adminEvents: Joi.object().keys({
    abiFile: Joi.array().items(
      Joi.object({
        inputs: Joi.array().required,
        type: Joi.string().required(),
      })
    ),
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
    expression: Joi.string().required(),
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
  alertMinimumIntervalSeconds: 86400,
};

const adminEvents = {
  abiFile: ABI,
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

if (accountBalanceResult.error) {
  console.log(accountBalanceResult.error.details);
} else {
  console.log("Validated Data", accountBalanceResult);
}
module.exports = schema;
