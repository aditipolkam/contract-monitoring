import { ethers, upgrades } from "hardhat";

async function main() {
  //   const gas = await ethers.provider.gas();
  const [deployer] = await ethers.getSigners();
  const ownerAddress = deployer.address;

  const Bank_V1 = await ethers.getContractFactory("Bank_V1");

  console.log("Deploying V1contract...");

  const v1contract = await upgrades.deployProxy(Bank_V1, [ownerAddress], {
    initializer: "initialize",
  });
  await v1contract.waitForDeployment();

  console.log("Bank_V1 Contract deployed to:", await v1contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
