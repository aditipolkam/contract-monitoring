import { ethers } from "hardhat";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
  const [deployer, signer1, signer2] = await ethers.getSigners();

  // Deposit from deployer
  let bank = await ethers.getContractAt(
    "contracts/Bank_V1.sol:Bank_V1",
    contractAddress,
    deployer
  );
  let tx = await bank.deposit({ value: ethers.parseEther("1.0") });
  await tx.wait();
  console.log(`Deployer deposited 1 ETH`);

  // Deposit from signer1
  bank = await ethers.getContractAt(
    "contracts/Bank_V1.sol:Bank_V1",
    contractAddress,
    signer1
  );
  tx = await bank.deposit({ value: ethers.parseEther("2.0") });
  await tx.wait();
  console.log(`Signer1 deposited 2 ETH`);

  // Deposit from signer2
  bank = await ethers.getContractAt(
    "contracts/Bank_V1.sol:Bank_V1",
    contractAddress,
    signer2
  );
  tx = await bank.deposit({ value: ethers.parseEther("0.5") });
  await tx.wait();
  console.log(`Signer2 deposited 0.5 ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
