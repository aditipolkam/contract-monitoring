import { ContractFactory } from "ethers";
import { ethers, upgrades } from "hardhat";
import contractconfig from "./config";

const deployerPrivateKey = contractconfig.data.privateKey;

async function main() {
  // Connect the wallet to a provider
  const provider = ethers.provider; // Use the Hardhat provider
  const wallet = new ethers.Wallet(deployerPrivateKey, provider);
  const contractName = "contracts/Bank_V1.sol:Bank_V1";

  const Bank_V1 = (await ethers.getContractFactory(
    contractName
  )) as ContractFactory;

  console.log("Deploying Bank_V1 contract...");

  // Use the wallet as the signer for the deployment
  const v1contract = await upgrades.deployProxy(Bank_V1, [wallet.address], {
    initializer: "initialize",
  });
  await v1contract.waitForDeployment();

  const address = await v1contract.getAddress();
  contractconfig.set({ proxyAddress: address });
  contractconfig.set({ bankContractName: contractName });

  console.log("Bank_V1 Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
