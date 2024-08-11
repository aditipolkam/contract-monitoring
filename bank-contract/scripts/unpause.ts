import { ethers } from "hardhat";
import config from "./config";

const contractAddress = config.data.proxyAddress;
const deployerPrivateKey = config.data.privateKey;
const contractName = config.data.bankContractName;

async function main() {
  const provider = ethers.provider;
  const wallet = new ethers.Wallet(deployerPrivateKey, provider);

  let bank = await ethers.getContractAt(contractName, contractAddress, wallet);

  let tx1 = await bank.unpause();
  await tx1.wait();

  console.log(`Unpaused`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
