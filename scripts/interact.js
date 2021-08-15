async function main() {

        const Web3 = require('web3')
        const hre = require('hardhat')
        const web3 = new Web3('http://localhost:8545');

        let accounts = await web3.eth.getAccounts();
        console.log(accounts)
        //
        const myContractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

        const greeterArtifact = hre.artifacts.readArtifact('Greeter');
        const myAbi = (await greeterArtifact).abi
        console.log(myAbi)

        const myContract = new web3.eth.Contract(myAbi, myContractAddress);
        console.log('Got the contract')

        await myContract.methods.greet().call().then((jsonRpcResult) => {
                console.log(jsonRpcResult);
        });

        const ethDecimals = 18;
        let ethBalance = await web3.eth.getBalance(myContractAddress) / Math.pow(10, ethDecimals);
        console.log(ethBalance, ' is the contracts ETH balance')
        //
        const differentAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

        let diffWalletBalance = await web3.eth.getBalance(differentAddress) / Math.pow(10, ethDecimals);
        console.log(diffWalletBalance, ' is my wallets ETH balance');


        const objBuilder = myContract.methods.setGreeting('Hello senor, my name is Oli')
        let encoded_tx = objBuilder.encodeABI();

        await web3.eth.sendTransaction({
                from: differentAddress,
                to: myContractAddress,
                data: encoded_tx
        })

        console.log('Changed the greeting')

        const payTxBuilder = myContract.methods.payGreeter()
        let pay_encoded_tx = payTxBuilder.encodeABI()

        await web3.eth.sendTransaction({
                from: differentAddress,
                to: myContractAddress,
                data: pay_encoded_tx,
                gasLimit: web3.utils.toHex(300000),
                gasPrice: web3.utils.toHex(20000000000), // use ethgasstation.info (mainnet only)
                value: web3.utils.toHex(web3.utils.toWei('1', 'ether'))
        })


        await myContract.methods.greet().call().then((jsonRpcResult) => {
                console.log(jsonRpcResult);
        });

        //
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });