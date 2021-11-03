const Greeter = artifacts.require("Greeter");
Greeter.numberFormat = 'String';
const PenroseToken = artifacts.require("PenroseToken")

const { ethers } = require("hardhat");

// Traditional Truffle test
contract("Greeter", (accounts) => {
  it("Should return the new greeting once it's changed", async function () {
    const greeter = await Greeter.new("Hello, world!");
    assert.equal(await greeter.greet(), "Hello, world!");

    await greeter.setGreeting("Hola, mundo!");

    assert.equal(await greeter.greet(), "Hola, mundo!");
  });
});

contract("PenroseToken", (accounts) => {
    it("Should return same total supply as was initiated", async function () {
        const tokenInst = await PenroseToken.new(10^18);
        assert.equal(await tokenInst.getSupply(), 10^18)
    })
})

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("Greeter contract", function () {
  let accounts;

  before(async function () {
    accounts = await web3.eth.getAccounts();
  });

  describe("Deployment", function () {
    it("Should deploy with the right greeting", async function () {
      const greeter = await Greeter.new("Hello, world!");
      assert.equal(await greeter.greet(), "Hello, world!");

      const greeter2 = await Greeter.new("Hola, mundo!");
      assert.equal(await greeter2.greet(), "Hola, mundo!");
    });
  });

  describe("Set Greeting", function () {
    it('should change the greeting to what is set', async function () {
      const greeter = await Greeter.new("First greeting");
      assert.equal(await greeter.greet(), "First greeting");

      await greeter.setGreeting("Second greeting");
      assert.equal(await greeter.greet(), "Second greeting")

    });
  })

  //TODO figure out how to use web3.js so that we can send transactions in tests

  //TODO add balances and transfer variable/fns to hold the state of balances of users of the tokens

  describe("Pay Greeter", function () {
    it('should increase the amount by what is paid',async function () {
      // using Truffle abstraction api .new()
      const greeter = await Greeter.new("Greeter with no ETH");

      console.log('Contract deployed to ', greeter.address, 'with ', await greeter.getBalance(), 'in ETH')
      console.log(await web3.eth.getBalance(greeter.address), ' is the balance of greeter contract now')
      const payerAddress = accounts[1]
      console.log(web3.utils.toChecksumAddress(payerAddress), ' this is the checksum address')
      console.log(await web3.eth.getBalance(payerAddress), ' this is the balance of payer now at address ', payerAddress)

      const newResult = await greeter.payGreeter({
        to: web3.utils.toChecksumAddress(greeter.address),
        from: web3.utils.toChecksumAddress(payerAddress),
        value: web3.utils.toWei("1", "ether")
      })

      console.log(newResult.logs, ' this is the logs')
      console.log(await greeter.getBalance())
      console.log(await web3.eth.getBalance(payerAddress), ' this is the NEW balance of payer now at address ', payerAddress)
      let newBalance = await web3.eth.getBalance(greeter.address);
      console.log(newBalance, ' is the NEW balance of greeter contract now')


      assert.equal(newBalance, web3.utils.toWei('1', 'ether'));

    });
  })

});