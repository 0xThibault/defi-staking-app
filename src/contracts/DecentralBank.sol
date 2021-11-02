// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(RWD _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    // Staking function
    function depositTokens(uint256 _amount) public {
        require(_amount > 0);

        // Transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] += _amount; 

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking balance
        isStaked[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstake function
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance can't be less than zero");

        // transfer tokens to the specified contract address from the bank
        stakingBalance[msg.sender] = 0;
        tether.transfer(msg.sender, balance);
        // update staking status
        isStaked[msg.sender] = false;
    }

    //  Issue rewards
    function issueTokens () public {
        require(msg.sender == owner, "Caller must be the owner");

        for(uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 9;
            if(balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }
}
