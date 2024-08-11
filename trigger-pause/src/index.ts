import { ethers } from 'ethers';
import ABI from './data/BankAbi.json';
import contractConfig from './config/contract.config';
import { handleDeposit, handleWithdraw } from './services/balance-tracker';

const endPoint = 'http://127.0.0.1:8545';
const contractAddress = contractConfig.data.proxyAddress;
const provider = new ethers.JsonRpcProvider(endPoint);
const contract = new ethers.Contract(contractAddress, ABI, provider);

async function main() {
  contract.on('Deposit', async (from, value) => {
    handleDeposit(from, value);
  });

  contract.on('Withdraw', async (receiver, value) => {
    handleWithdraw(receiver, value);
  });

  contract.on('*', async (event) => {
    // console.log(event);
  });
}

main()
  .then(() => {
    console.info('Listening to contract at:', contractAddress);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
