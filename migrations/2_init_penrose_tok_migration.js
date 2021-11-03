const PenroseToken = artifacts.require("PenroseToken")

module.exports = async function (deployer) {
  await deployer.deploy(PenroseToken, 1001);
};