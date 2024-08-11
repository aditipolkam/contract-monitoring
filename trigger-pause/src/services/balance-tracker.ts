import { ethers } from 'ethers';
import pauseContract from '../helpers/pauseContract';
import alertOwner from '../helpers/alertOwner';
import contractConfig from '../config/contract.config';

const contractAddress = contractConfig.data.proxyAddress;
const email = contractConfig.data.ownerEmail;

interface Balances {
  [address: string]: bigint;
}

const balances: Balances = {};
let alertSent = false;

export const handleDeposit = (from: string, value: number) => {
  if (!balances[from]) {
    balances[from] = 0n;
  }
  balances[from] = balances[from] + BigInt(value);
  console.log(`Deposit: ${from} now has a balance of ${ethers.formatUnits(balances[from].toString(), 'ether')} ETH`);
};

export const handleWithdraw = (receiver: string, value: number) => {
  if (!balances[receiver]) {
    console.log(`Withdraw event detected but no balance record for ${receiver}. Possible attack!`);
    pauseContract();
    if (!alertSent) {
      alertOwner({
        to: email,
        contractAddress,
        message: `Withdraw event detected but no balance record for ${receiver}. Possible reentrancy attack!`,
      });
      alertSent = true;
    }
    return;
  }
  if (balances[receiver] === 0n) {
    console.log(`Withdraw event detected but balance is 0 for ${receiver}. Possible attack!`);
    pauseContract();
    if (!alertSent) {
      alertOwner({
        to: email,
        contractAddress,
        message: `Withdraw event detected but balance is 0 for ${receiver}. Possible reentrancy attack!`,
      });
      alertSent = true;
    }
    return;
  }
  balances[receiver] = balances[receiver] - BigInt(value);
  console.log(
    `Withdraw: ${receiver} now has a balance of ${ethers.formatUnits(balances[receiver].toString(), 'ether')} ETH`,
  );
  if (balances[receiver] < 0n) {
    console.log(`Warning! Negative balance detected for ${receiver}. Possible attack!`);
  }
};
