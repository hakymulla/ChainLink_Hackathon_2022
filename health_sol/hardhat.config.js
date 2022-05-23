require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
const dotenv = require('dotenv');
dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
        {
            version: "0.8.7",
        },
        {
            version: "0.7.0",
        },
    ],
},

  // namedAccounts: {
  //   deployer: {
  //       default: 0, // here this will by default take the first account as deployer
  //       1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
  //   },
  // },

  networks:{
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      chaindId: 4,
      url: process.env.RINKEBY_RPC_URL,
      accounts:[process.env.REACT_APP_PRIVATE_KEY, process.env.ALICE],
      // timeout: 60000,
      // gas: 21000000000,
      // gasPrice: 80000000000000,
      // blockGasLimit:10000000042972000000,
      // gasLimit: 900000000000
    },
  },
};
