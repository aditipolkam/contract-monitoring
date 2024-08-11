import { ethers } from "hardhat";
import config from "./config";

const contractAddress = config.data.proxyAddress;
const contractName = config.data.bankContractName;

async function main() {
  const [deployer, signer1, signer2] = await ethers.getSigners();

  // Deposit from deployer
  let bank = await ethers.getContractAt(
    contractName,
    contractAddress,
    deployer
  );
  let tx = await bank.deposit({ value: ethers.parseEther("1.0") });
  await tx.wait();
  console.log(`Deployer deposited 1 ETH`);

  // Deposit from signer1
  bank = await ethers.getContractAt(contractName, contractAddress, signer1);
  tx = await bank.deposit({ value: ethers.parseEther("2.0") });
  await tx.wait();
  console.log(`Signer1 deposited 2 ETH`);

  // Deposit from signer2
  bank = await ethers.getContractAt(contractName, contractAddress, signer2);
  tx = await bank.deposit({ value: ethers.parseEther("0.5") });
  await tx.wait();
  console.log(`Signer2 deposited 0.5 ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
