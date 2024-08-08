import { ethers, upgrades } from "hardhat";

async function main() {
  const Bank_V2 = await ethers.getContractFactory("Bank_V2");
  console.log("Upgrading Bank...");
  await upgrades.upgradeProxy(
    "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
    Bank_V2
  );
  console.log("Box upgraded");
}

main();
