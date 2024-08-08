import { ethers, upgrades } from "hardhat";

const proxyAddress = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";

async function main() {
  //   const gas = await ethers.provider.gas();
  //   const [deployer] = await ethers.getSigners();
  //   const ownerAddress = deployer.address;

  const Bank_V1 = await ethers.getContractFactory("Bank_V1");

  console.log("Deploying V1contract...");

  const v1contract = await upgrades.upgradeProxy(proxyAddress, Bank_V1);
  await v1contract.waitForDeployment();

  console.log("Bank_V1 Contract deployed to:", await v1contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
