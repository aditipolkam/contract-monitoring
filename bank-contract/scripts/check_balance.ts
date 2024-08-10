import hardhat from "hardhat";
import config from "./config";

const contractAddress = config.configData.bankContractAddress;
const contractName = "contracts/Bank_V1.sol:Bank_V1";

async function main() {
  const signers = await hardhat.ethers.getSigners();
  let bankContract = await hardhat.ethers.getContractAt(
    contractName,
    contractAddress,
    signers[0]
  );

  // Print Bank Data
  console.log(
    `Bank Balance: ${hardhat.ethers.formatUnits(
      await hardhat.ethers.provider.getBalance(contractAddress)
    )}`
  );
  console.log(
    `Account 0 Balance: ${hardhat.ethers.formatUnits(
      await bankContract.balances(signers[0].address)
    )}`
  );
  console.log(
    `Account 1 Balance: ${hardhat.ethers.formatUnits(
      await bankContract.balances(signers[1].address)
    )}`
  );
  console.log(
    `Account 2 Balance: ${hardhat.ethers.formatUnits(
      await bankContract.balances(signers[2].address)
    )}`
  );
  console.log(
    `Account 3 Balance: ${hardhat.ethers.formatUnits(
      await bankContract.balances(signers[3].address)
    )}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
