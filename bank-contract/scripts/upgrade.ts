import { ethers, upgrades } from "hardhat";
import config from "./config";

const bank_v1_contract = config.data.proxyAddress;
const contractToUpgrade = "contracts/Bank_V2.sol:Bank_V2";

async function main() {
  const Bank_V2 = await ethers.getContractFactory(contractToUpgrade);
  console.log("Upgrading Bank...");
  const proxy = await upgrades.upgradeProxy(bank_v1_contract, Bank_V2);
  const address = await proxy.getAddress();
  // config.set({ bankContractAddress: address });
  config.set({ bankContractName: contractToUpgrade });
  console.log("Box upgraded: ", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
