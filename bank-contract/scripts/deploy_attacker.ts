import hardhat from "hardhat";
import config from "./config";

const bank_v1_contract = config.data.proxyAddress;

async function main() {
  const attackBankInstance = await hardhat.ethers.getContractFactory(
    "AttackBank"
  );
  const deployedDontract = await attackBankInstance.deploy(bank_v1_contract);

  const address = await deployedDontract.getAddress();
  config.set({ attackContractAddress: address });
  console.log("AttackBank Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
