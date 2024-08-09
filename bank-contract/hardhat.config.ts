import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import { config } from "dotenv";
config();

const hardhatconfig: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: process.env["SEPOLIA_NODE"] as string,
      accounts: [process.env["PRIVATE_KEY"] as string],
    },
  },
};

export default hardhatconfig;
