import { ethers } from 'ethers';
import ABI from './data/BankAbi.json';
// import { SEPOLIA_NODE } from './config/constants';
import contractConfig from './config/contract.config';
import { handleDeposit, handleWithdraw } from './services/balance-tracker';

const endPoint = 'http://127.0.0.1:8545';
const contractAddress = contractConfig.configData.bankContractAddress;
const provider = new ethers.JsonRpcProvider(endPoint);
const contract = new ethers.Contract(contractAddress, ABI, provider);

async function main() {
  contract.on('Deposit', async (from, value) => {
    handleDeposit(from, value);
  });

  contract.on('Withdraw', async (receiver, value) => {
    handleWithdraw(receiver, value);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
