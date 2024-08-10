import { ethers } from 'ethers';
import { SEPOLIA_NODE } from '../config/constants';
import ABI from '../data/BankAbi.json';

const pauseContract = async (contractAddress: string, adminPrivateKey: string) => {
  try {
    const provider = new ethers.JsonRpcProvider(SEPOLIA_NODE);
    const wallet = new ethers.Wallet(adminPrivateKey, provider);
    const contract = new ethers.Contract(contractAddress, ABI, wallet);

    //estimate gas

    const txn = await contract.pause();
    const receipt = await txn.wait();
    return receipt;
  } catch (error) {
    console.error('Error in transaction:', error);
  }
};

export default pauseContract;
