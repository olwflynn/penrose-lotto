pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PenroseToken is ERC20 {

    event ValueReceived(address user, uint amount);
    address public minter;

    constructor(uint initialSupply) ERC20("Penrose", "PNR") public {
        minter = msg.sender;
        _mint(minter, initialSupply);

    }

    function getSupply() public view returns(uint) {
        return super.totalSupply();
    }

    function getERCBalance(address _address) public view returns(uint) {
        return super.balanceOf(_address);
    }

    // buyToken should require e.g. numberTokens per ETH or msg.value

    function buyToken(uint numberTokens, uint tokenPrice) payable public {
        require(msg.value > numberTokens*tokenPrice, "Did not transfer enough ETH");
        //set allowance of msg.sender to zero first and then approve the numberofTokens
        // NEED TO CHANGE TO INCORPORSTE NON UNITY PRICES
//        _approve(msg.sender, 0);
//        _approve(msg.sender, msg.value);
//        super.transferFrom(minter, msg.sender, numberTokens);
        sendTokenFromMinter(msg.sender, numberTokens);
        emit ValueReceived(msg.sender, msg.value);
    }

    function sendTokenFromMinter(address receiver, uint numberTokens) internal {
        super._transfer(minter, receiver, numberTokens);
    }

    // Need to figure out what the default in the init migration and then make sure that what is being sent in the UI is
    // appropriate when buying a token

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