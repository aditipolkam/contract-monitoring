import { ethers } from 'ethers';
import ABI from './data/BankAbi.json';
// import { SEPOLIA_NODE } from './config/constants';
import contractConfig from './config/contract.config';

const endPoint = 'http://127.0.0.1:8545';

const contractAddress = contractConfig.configData.bankContractAddress;

async function main() {
  const provider = new ethers.JsonRpcProvider(endPoint);
  const contract = new ethers.Contract(contractAddress, ABI, provider);

  contract.on('Deposit', async (from, value, event) => {
    const depositEvent = {
      from,
      value: value.toString(),
    };

    console.log({ deposit: JSON.stringify(depositEvent) });
    console.log({ transactionHash: event.log.transactionHash });
  });

  contract.on('Withdraw', async (receiver, value, event) => {
    const withdrawEvent = {
      receiver,
      value: value.toString(),
    };

    console.log({ withdraw: JSON.stringify(withdrawEvent) });
    console.log({ transactionHash: event.log.transactionHash });
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
