import hardhat from "hardhat";

const bank_v1_contract = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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
