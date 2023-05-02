var AccountingSystem = artifacts.require("AccountingSystem");
var AccountingToken = artifacts.require("AccountingToken"); 

module.exports = async function(deployer) {
  await deployer.deploy(AccountingToken, process.env.INITIAL_SUPPLY);
  
  const AccountingTokenAddress = await AccountingToken.deployed();
  // Deploy the SolidityContract contract as our only task
  await deployer.deploy(AccountingSystem, AccountingTokenAddress.address);
};