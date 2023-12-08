require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
        forking: {
            url: "https://mainnet.infura.io/v3/fcd544df357f4f15b680bcb3e021f721",
        },
        chainId: 31337, 
    },
},
  solidity: "0.8.19",
};
