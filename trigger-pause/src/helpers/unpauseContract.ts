import { ethers } from 'ethers';
import ABI from '../data/BankAbi.json';
import contractConfig from '../config/contract.config';

const adminPrivateKey = contractConfig.configData.privateKey;
const contractAddress = contractConfig.configData.bankContractAddress;
const endPoint = 'http://127.0.0.1:8545';

const unpauseContract = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(endPoint);
    const wallet = new ethers.Wallet(adminPrivateKey, provider);
    const contract = new ethers.Contract(contractAddress, ABI, wallet);

    // Estimate gas
    const txn = await contract.unpause();
    const receipt = await txn.wait();
    console.log('Contract unpaused successfully.');
    return receipt;
  } catch (error) {
    console.error('Error unpausing contract:', error);
  }
};

export default unpauseContract;
