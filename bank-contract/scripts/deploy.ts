import { ContractFactory } from "ethers";
import { ethers, upgrades } from "hardhat";
import contractconfig from "./config";

const deployerPrivateKey = contractconfig.configData.privateKey;

async function main() {
  // Connect the wallet to a provider
  const provider = ethers.provider; // Use the Hardhat provider
  const wallet = new ethers.Wallet(deployerPrivateKey, provider);

  const Bank_V1 = (await ethers.getContractFactory(
    "contracts/Bank_V1.sol:Bank_V1"
  )) as ContractFactory;

  console.log("Deploying Bank_V1 contract...");

  // Use the wallet as the signer for the deployment
  const v1contract = await upgrades.deployProxy(Bank_V1, [wallet.address], {
    initializer: "initialize",
  });
  await v1contract.waitForDeployment();

  const address = await v1contract.getAddress();
  contractconfig.set({ bankContractAddress: address });

  console.log("Bank_V1 Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
