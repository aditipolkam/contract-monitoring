import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
// import { config } from "dotenv";
// config();

const hardhatconfig: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      mining: {
        auto: true,
        // Produce new block every 3 minutes to resolve next issues
        // https://github.com/NomicFoundation/hardhat/issues/2053
        // https://github.com/ethers-io/ethers.js/issues/2338
        // https://github.com/ethers-io/ethers.js/discussions/4116
        interval: 3 * 60 * 1000, // should be less then 5 minutes to make event subscription work
      },
    },
    //   sepolia: {
    //     chainId: 11155111,
    //     url: process.env["SEPOLIA_NODE"] as string,
    //     accounts: [process.env["PRIVATE_KEY"] as string],
    //   },
  },
};

export default hardhatconfig;
