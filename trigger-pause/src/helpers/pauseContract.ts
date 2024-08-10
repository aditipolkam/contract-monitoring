import { ethers } from 'ethers';
// import { SEPOLIA_NODE } from '../config/constants';
import ABI from '../data/BankAbi.json';
import contractConfig from '../config/contract.config';

const adminPrivateKey = contractConfig.configData.privateKey;
const contractAddress = contractConfig.configData.bankContractAddress;
const endPoint = 'http://127.0.0.1:8545';

const pauseContract = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(endPoint);
    const wallet = new ethers.Wallet(adminPrivateKey, provider);
    const contract = new ethers.Contract(contractAddress, ABI, wallet);

    //estimate gas

    const txn = await contract.pause();
    const receipt = await txn.wait();
    console.log('Contract paused successfully.');
    return receipt;
  } catch (error) {
    console.error('Error in transaction:', error);
  }
};

export default pauseContract;
