pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PenroseToken is ERC20 {

    event ValueReceived(address user, uint amount);
    address public minter;
    string public testString = "Hope this works!";

    constructor(uint initialSupply) ERC20("Penrose", "PNR") public {
        _mint(msg.sender, initialSupply);
        minter = msg.sender;
    }

    function getSupply() public view returns(uint) {
        return super.totalSupply();
    }

    function getERCBalance(address _address) public view returns(uint) {
        return super.balanceOf(_address);
    }

    // buyToken should require e.g. numberTokens per ETH

    function buyToken(uint numberTokens) payable public {
        super.transfer(msg.sender, numberTokens);
        emit ValueReceived(msg.sender, msg.value);
    }

    // pickWinner should only be used by the minter i.e. contract creator and should randomly pick a winner
    // from all the token holders

//    function pickWinner() public returns(address) {
//        require(msg.sender == minter);
        // logic to pick winner e.g. get latest block ... randomness
        // address winner =
//         return winner;
//    }

}


//TODO and useful commands
//instance2.totalSupply().then(result => result.toString()) to convert BN to readable number
//instance2.balanceOf(payerAddress) to get balance of payerAddress
//web3.eth.getBalance(instance2.address) to get balance of contractAddress
//const inst = await PenroseToken.new(123)
//instToken.transfer(receiverAddress, 99)

//     const payment1 = await instToken.buyToken(1, {to: web3.utils.toChecksumAddress(instToken.address), from: web3.utils.toChecksumAddress('0x6bce403cd96ee6118ec49892c4d8a179727b5816'), value: web3.utils.toWei("1", "ether")})

//truffle exec scripts/query.js --network development