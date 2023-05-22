var ObligationToken = artifacts.require("ObligationToken"); 
var LoanFactory = artifacts.require("LoanFactory");

module.exports = async function(deployer) {
  await deployer.deploy(ObligationToken, process.env.INITIAL_SUPPLY);
  const ObligationTokenAddress = await ObligationToken.deployed();
  await deployer.deploy(LoanFactory, ObligationTokenAddress.address);
};
