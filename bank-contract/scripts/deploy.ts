import { ContractFactory } from "ethers";
import { ethers, upgrades } from "hardhat";
import config from "./config";

async function main() {
  const [deployer] = await ethers.getSigners();
  const ownerAddress = deployer.address;

  const Bank_V1 = (await ethers.getContractFactory(
    "contracts/Bank_V1.sol:Bank_V1"
  )) as ContractFactory;

  console.log("Deploying Bank_V1 contract...");

  const v1contract = await upgrades.deployProxy(Bank_V1, [ownerAddress], {
    initializer: "initialize",
  });
  await v1contract.waitForDeployment();

  const address = await v1contract.getAddress();
  config.set({ bankContractAddress: address });

  console.log("Bank_V1 Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
