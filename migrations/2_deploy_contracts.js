const ConfigurationSystem = artifacts.require("ConfigurationSystem");

module.exports = function (deployer) {
  deployer.deploy(ConfigurationSystem);
};
