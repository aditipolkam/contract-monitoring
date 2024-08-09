import { ethers } from 'ethers';
import ABI from './data/BankAbi.json';
import { SEPOLIA_NODE } from './config/constants.js';

async function main() {
  const contractAddress = '0xcd180A6F57EE9c2ee8751D6D87a17695290D063C';
  const provider = new ethers.JsonRpcProvider(SEPOLIA_NODE);
  const contract = new ethers.Contract(contractAddress, ABI, provider);

  contract.on('Deposit', async (from, value, event) => {
    const transferEvent = {
      from: event.args[0], // _from (address)
      value: event.args[1].toString(), // value (uint), convert BigInt to string
      eventData: event,
    };

    console.log(transferEvent);
    // console.log(JSON.stringify(transferEvent, null, 4));
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
