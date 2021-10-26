// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Tether {
    string public name = "Fake Tether";
    string public symbol = "fUSDT";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million token
    uint8 public decimals = 18;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer (address indexed _from, address indexed _to, uint _value);
    event Approval (address indexed _owner, address indexed _spender, uint _value);

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balanceOf[msg.sender] >= _value, "You don't have enough money");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[msg.sender][_from] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }
}
