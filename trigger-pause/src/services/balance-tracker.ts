import { ethers } from 'ethers';
import pauseContract from '../helpers/pauseContract';

interface Balances {
  [address: string]: bigint;
}

const balances: Balances = {};

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
    return;
  }
  if (balances[receiver] === 0n) {
    console.log(`Withdraw event detected but balance is 0 for ${receiver}. Possible attack!`);
    pauseContract();
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
