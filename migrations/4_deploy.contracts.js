var ObligationToken = artifacts.require("ObligationToken"); 

module.exports = async function(deployer) {
  await deployer.deploy(ObligationToken, process.env.INITIAL_SUPPLY);
  
};