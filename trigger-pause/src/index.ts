import { ethers } from 'ethers';
import ABI from './data/BankAbi.json';
import { SEPOLIA_NODE } from './config/constants';

const contractAddress = '0xcd180A6F57EE9c2ee8751D6D87a17695290D063C';

async function main() {
  const provider = new ethers.JsonRpcProvider(SEPOLIA_NODE);
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
