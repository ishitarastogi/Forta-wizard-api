const Joi = require("joi");
const { ethers } = require("ethers");
const addrPattern = /^0[xX][a-fA-F0-9]{40}$/;
const expPattern = /^0[xX](?!0+$)[a-fA-F0-9]{40}$/;

const schema = {
  abis: Joi.object().keys({
    monitorAbi: "",
  }),
  adminEvents: Joi.object().keys({
    address: Joi.string().pattern(new RegExp(addrPattern)).required(),

    expression: Joi.string().pattern(new RegExp(expPattern)).required(),

    proxy: Joi.string().alphanum().required(),
  }),

  accountBalance: Joi.object().keys({
    address: Joi.string().pattern(new RegExp(addrPattern)).required(),
    thresholdEth: Joi.number().valid(0),
    alertMinimumIntervalSeconds: Joi.date()
      .required()
      .valid(Date.now() + 24 * 60 * 60 * 1000),
  }),
  monitorFunctionCalls: Joi.object().keys({
    address: Joi.string().pattern(new RegExp(addrPattern)).required(),
    amount: Joi.number().integer().min(6000),
  }),
};

//Tested all of them, works fine
// doubt in alertMinimumIntervalSeconds
const zeroAddress = "0x0000000000000000000000000000000000000000";
const address = "0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836";
const expression = "0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836";
const proxy = "contract1";
const thresholdEth = 0;
const amount = 6001;
const wrongAmount = 5001;
//let adminEventsData = { address, expression, proxy };
// let adminEventsData = { address, zeroAddress, proxy }; gives error
//let accountBalanceData = { address, thresholdEth };
let monitorFunctionCalls = { address, amount };
const result = schema.monitorFunctionCalls.validate(monitorFunctionCalls);
// const result = schema.accountBalance.validate(accountBalanceData);
// const result = schema.adminEvents.validate(adminEventsData);

if (result.error) {
  console.log(result.error.details);
} else {
  console.log("Validated Data", result);
}
module.exports = schema;
