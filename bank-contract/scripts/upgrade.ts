import { ethers, upgrades } from "hardhat";

const bank_v1_contract = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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
