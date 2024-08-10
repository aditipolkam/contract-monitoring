import { ethers } from "hardhat";
import config from "./config";

const contractAddress = config.configData.bankContractAddress;
const deployerPrivateKey = config.configData.privateKey;
async function main() {
  const provider = ethers.provider;
  const wallet = new ethers.Wallet(deployerPrivateKey, provider);

  let bank = await ethers.getContractAt(
    "contracts/Bank_V1.sol:Bank_V1",
    contractAddress,
    wallet
  );

  let tx1 = await bank.unpause();
  await tx1.wait();

  console.log(`Unpaused`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
