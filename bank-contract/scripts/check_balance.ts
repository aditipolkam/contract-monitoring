import hardhat from "hardhat";

const contractAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
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

  console.log(
    `Account 4 - Attacker Balance: ${hardhat.ethers.formatUnits(
      await bankContract.balances("0xa513E6E4b8f2a923D98304ec87F64353C4D5C853")
    )}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
