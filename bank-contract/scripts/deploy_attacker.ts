import hardhat from "hardhat";

const bank_v1_contract = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";

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
