import React from "react";

class WriteContract extends React.Component {

    state = { numTokensBought: null };

    handleButtonPress = () => {
        this.buyTokens();
    }

// change the () to value to create input variable to the fn
    buyTokens = () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.PenroseToken;
        console.log("Address that is buying tokens is: ", drizzleState.accounts[1])
        contract.methods.buyToken(1, 100).send({
            from: drizzleState.accounts[1],
            to: contract.address,
            value: 1000
            })
        this.setState({numTokensBought: 1})

    };

    getTxStatus = () => {
        // get the transaction states from the drizzle state
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.PenroseToken;

        const { transactions, transactionStack } = this.props.drizzleState;

        console.log(transactionStack);


//        console.log(contract.methods.getERCBalance(drizzleState.accounts[0])).call()


        // get the transaction hash using our saved `stackId`
//        const txHash = transactionStack[this.state.stackId];

}

    render() {
        return (
          <div>
            <input type="button" value="Buy 1 Penrose Token" onClick={this.handleButtonPress} />
            <div>{this.getTxStatus()}</div>
          </div>
        );
      }

//     const payment1 = await instToken.buyToken(1, {to: web3.utils.toChecksumAddress(instToken.address), from: web3.utils.toChecksumAddress('0x6bce403cd96ee6118ec49892c4d8a179727b5816'), value: web3.utils.toWei("1", "ether")})

//instance2.balanceOf(payerAddress) to get balance of payerAddress


}

export default WriteContract;