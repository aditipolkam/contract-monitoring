import { ethers, upgrades } from "hardhat";

async function main() {
  const Bank_V2 = await ethers.getContractFactory("Bank_V2");
  console.log("Upgrading Bank...");
  const proxy = await upgrades.upgradeProxy(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    Bank_V2
  );
  console.log("Box upgraded");
  console.log(await proxy.getAddress());
}

main();
