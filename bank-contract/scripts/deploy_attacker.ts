import hardhat from "hardhat";
import config from "./config";

const bank_v1_contract = config.configData.bankContractAddress;
async function main() {
  const attackBankInstance = await hardhat.ethers.getContractFactory(
    "AttackBank"
  );
  const deployedDontract = await attackBankInstance.deploy(bank_v1_contract);

  console.log(
    "AttackBank Contract deployed to:",
    await deployedDontract.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
