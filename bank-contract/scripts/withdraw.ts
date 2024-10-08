import { ethers } from "hardhat";
import config from "./config";

const contractAddress = config.data.proxyAddress;
const contractName = config.data.bankContractName;

async function main() {
  const [deployer, signer1, signer2] = await ethers.getSigners();

  let bank = await ethers.getContractAt(
    contractName,
    contractAddress,
    deployer
  );

  let tx1 = await bank.deposit({ value: ethers.parseEther("1.0") });
  await tx1.wait();

  let tx2 = await bank.withdraw();
  await tx2.wait();
  console.log(`Deployer withdrew 1 ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
