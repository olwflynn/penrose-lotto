const PenroseToken = artifacts.require("PenroseToken")
PenroseToken.numberFormat = 'String';

contract("PenroseToken", (accounts) => {

     let tokenInst;
     let minter;
     let supply = 100

     before(async function () {
         tokenInst = await PenroseToken.new(supply, {from: accounts[0]});
         minter = await tokenInst.minter.call()
         console.log("Address of contract is: ", tokenInst.address);
         console.log("Address of minter is: ", minter)
     });

    it("Should return same total supply as was initiated", async function () {
        const totalSupply = await tokenInst.getSupply();
        assert.equal(totalSupply, supply)
    })

     it("Should return address of the minter as equal to the address of the sender", async function () {
         assert.equal(minter, accounts[0])
     })

     it("Minter should have all the tokens after contract is deployed", async function () {
         const minterBalance = await tokenInst.getERCBalance.call(minter);
         assert.equal(minterBalance.valueOf(), supply)
     })

    it("Should transfer the right amount of tokens from minter to buyer and ETH from buyer to contract", async function () {

          // starting balance is 0
      const buyer = accounts[1]
      const startTokenBalance = await tokenInst.getERCBalance.call(buyer);
      const startContractETHBalance = await web3.eth.getBalance(tokenInst.address)
      assert.equal(startTokenBalance, 0);

      const tx = await tokenInst.buyToken(1, 1 , {
                  from: buyer,
                  to: tokenInst.address,
                  value: 10
                  });
    //
      console.log(tx);

      const endTokenBalance = await tokenInst.getERCBalance.call(buyer);
      assert.equal(Number(endTokenBalance), Number(startTokenBalance) + 1);

      const endContractETHBalance = await web3.eth.getBalance(tokenInst.address)
      assert.equal(Number(endContractETHBalance), Number(startContractETHBalance) + 10)
    })

// ADD test for reverting if price is too high


      it("Randomly select one of the addresses from all token holders", async function () {
        let winner;
        let tokenHolders;
        let tokenHolderA = accounts[1];
        let tokenHolderB = accounts[2];
        let tokenHolderC = accounts[3];

        tokenHolders = [tokenHolderA, tokenHolderB, tokenHolderC]
        console.log(tokenHolders);
        for(let i=0; i < tokenHolders.length; i++) {

            var tx = await tokenInst.buyToken(1, 1 , {
              from: tokenHolders[i],
              to: tokenInst.address,
              value: 10
              });
        }

        winner = await tokenInst.pickWinner.call()
        assert(tokenHolders.includes(winner), "Winner is not in tokenHolders")
        })


 })
