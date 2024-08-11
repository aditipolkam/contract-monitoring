import { ethers } from 'ethers';
import ABI from '../data/BankAbi.json';
import contractConfig from '../config/contract.config';

const adminPrivateKey = contractConfig.data.privateKey;
const contractAddress = contractConfig.data.proxyAddress;
const endPoint = 'http://127.0.0.1:8545';

const pauseContract = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(endPoint);
    const wallet = new ethers.Wallet(adminPrivateKey, provider);

    // Fetch current nonce
    const nonce = await provider.getTransactionCount(wallet.address);

    const contract = new ethers.Contract(contractAddress, ABI, wallet);

    // // Estimate gas
    // const gasLimit = await contract.estimateGas();
    // console.log(`Estimated gas: ${gasLimit.toString()}`);

    // Send transaction with specific nonce
    const txn = await contract.pause({
      nonce: nonce,
      gasLimit: '0x' + (2000000).toString(16),
    });

    console.log(`Transaction hash: ${txn.hash}`);
    const receipt = await txn.wait();
    console.log('Contract paused successfully.');
    return receipt;
  } catch (error) {
    const err = error as Error;
    if (!err.message.includes('nonce has already been used')) console.error('Error in transaction:', error);
  }
};

export default pauseContract;
