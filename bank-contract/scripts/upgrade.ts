import { ethers, upgrades } from "hardhat";
import config from "./config";

const bank_v1_contract = config.configData.bankContractAddress;

async function main() {
  const Bank_V2 = await ethers.getContractFactory("Bank_V2");
  console.log("Upgrading Bank...");
  const proxy = await upgrades.upgradeProxy(bank_v1_contract, Bank_V2);
  console.log("Box upgraded: ", await proxy.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
