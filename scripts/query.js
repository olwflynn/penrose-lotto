var contract = artifacts.require("PenroseToken");
var contract_address = "0x7eCC60651FE9197F01a16D80B435F25A9cFE993B"

module.exports = function() {

  async function getERCBalance(address) {
    let ins = await contract.at(contract_address);
    let res = await ins.getERCBalance(address);
    console.log('Balance at queried address is '+res.toString());
  }
  getERCBalance('0xD29fDab5A46D8FD7A33F86A84996041a96aac0F1');
}


// Try a payment from another account to and transfer tokens to that account and eth to this one