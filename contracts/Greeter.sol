//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract Greeter {
  string greeting;
  uint public amount;
  uint amountSent;
  event ValueSet(string _greeting);
  event ValueReceived(address user, uint amount);

  constructor(string memory _greeting) {
    console.log("Deploying a Greeter with greeting:", _greeting);
    greeting = _greeting;
    amount = 0;
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public {
    console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    greeting = _greeting;
    emit ValueSet(greeting);
  }

  function payGreeter() payable public {
    console.log("Paying contract '%s' from address", msg.value);
    amountSent = msg.value;
    amount += amountSent;
    emit ValueReceived(msg.sender, msg.value);
  }

  function getBalance() public view returns (uint) {
    return amount;
  }

}
