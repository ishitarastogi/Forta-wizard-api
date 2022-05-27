const Joi = require("joi");
const addrPattern = /^0[xX][a-fA-F0-9]{40}$/;
const ethers = require("ethers");

const ethersSchema = Joi.custom((value, helper) => {
  try {
    new ethers.utils.Interface(value);
    return value;
  } catch (_) {
    return helper.message("Not a valid ethers Interface");
  }
});

const events = Joi.object({
  type: Joi.string().required().trim(),
  severity: Joi.string().required().trim(),
  expression: Joi.string().optional(),
});

const eventSchema = Joi.object().pattern(Joi.string(), events);

const functions = Joi.object({
  type: Joi.string().required().trim(),
  severity: Joi.string().required().trim(),
  expression: Joi.number().optional(),
});

const functionSchema = Joi.object().pattern(Joi.string(), functions);

const contractSchemaAB = Joi.object({
  address: Joi.string().pattern(new RegExp(addrPattern)).required().trim(),
  thresholdEth: Joi.number().required(),
  alert: Joi.object({
    type: Joi.string().required().trim(),
    severity: Joi.string().required().trim(),
  }),
});
const contractSchemaAE = Joi.object({
  abiFile: Joi.required().valid(Joi.in("/abi")),
  address: Joi.string().pattern(new RegExp(addrPattern)).required().trim(),
  events: eventSchema,
  proxy: Joi.valid(Joi.in("/config.contracts")).optional(),
});

const contractSchemaMFC = Joi.object({
  abiFile: Joi.required().valid(Joi.in("/abi")),
  address: Joi.string().pattern(new RegExp(addrPattern)).required().trim(),
  functions: functionSchema,
});

const accountBalanceSchema = Joi.object({
  developerAbbreviation: Joi.string().required().trim(),
  protocolName: Joi.string().allow("").optional().trim(),
  protocolAbbreviation: Joi.string().allow("").optional(),
  accountBalance: Joi.object().pattern(Joi.string(), contractSchemaAB),
  alertMinimumIntervalSeconds: Joi.number().required(),
});

const adminEventsSchema = Joi.object({
  developerAbbreviation: Joi.string().required().trim(),
  protocolName: Joi.string().required().trim(),
  protocolAbbreviation: Joi.string().required().trim(),
  contracts: Joi.object().pattern(Joi.string(), contractSchemaAE),
});

const monitorFunctionCallsSchema = Joi.object({
  developerAbbreviation: Joi.string().required().trim(),
  protocolName: Joi.string().required().trim(),
  protocolAbbreviation: Joi.string().required().trim(),
  contracts: Joi.object().pattern(Joi.string(), contractSchemaMFC),
});

const schema = Joi.object().keys({
  abi: Joi.object().pattern(Joi.string(), ethersSchema),
  config:  adminEventsSchema,
});
module.exports =schema;
