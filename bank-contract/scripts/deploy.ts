import hardhat from "hardhat";

async function main() {
  const bankContractInstance = await hardhat.ethers.getContractFactory(
    "Bank_V1"
  );
  const deployedDontract = await bankContractInstance.deploy();

  console.log("Contract deployed to:", await deployedDontract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
