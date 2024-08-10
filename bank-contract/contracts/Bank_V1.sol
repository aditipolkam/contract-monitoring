// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Bank_V1 is Initializable, OwnableUpgradeable, PausableUpgradeable {
    mapping(address => uint256) public balances;

    event Deposit(address indexed _from, uint value);
    event Withdraw(address indexed _receiver, uint value);

    function initialize(address initialOwner) public initializer {
        __Ownable_init(initialOwner);
        __Pausable_init();
        transferOwnership(initialOwner);
    }

    function deposit() public payable whenNotPaused {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw() public whenNotPaused {
        uint256 balance = balances[msg.sender];

        // Send ETH
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Withdraw failed");

        // Update Balance
        balances[msg.sender] = 0;
        emit Withdraw(msg.sender, balance);
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
