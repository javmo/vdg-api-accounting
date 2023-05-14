const EntrySystem = artifacts.require("EntrySystem");

module.exports = function (deployer) {
  deployer.deploy(EntrySystem);
};
