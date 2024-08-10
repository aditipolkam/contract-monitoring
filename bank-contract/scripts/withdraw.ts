import { ethers } from "hardhat";

const contractAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";

async function main() {
  const [deployer, signer1, signer2] = await ethers.getSigners();

  let bank = await ethers.getContractAt(
    "contracts/Bank_V1.sol:Bank_V1",
    contractAddress,
    deployer
  );
  let tx = await bank.withdraw(ethers.parseEther("0.5"));
  await tx.wait();
  console.log(`Deployer withdrew 0.5 ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
