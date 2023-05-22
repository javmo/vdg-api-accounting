// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IConfiguration.sol";
import "../accountingSystem/IAccount.sol";
import "./Configuration.sol";

contract ConfigurationSystem {
    IConfiguration[] private allConfigurations;

    event ConfigurationCreated(address indexed configurationAddress);

    function createConfiguration(string memory description) external {
        IConfiguration newConfiguration = new Configuration(description);
        allConfigurations.push(newConfiguration);
        emit ConfigurationCreated(address(newConfiguration));
    }

    function setAccount(IConfiguration configuration, IAccount account, bool isCredit) external {
        if (isCredit) {
            configuration.setCreditAccount(account);
        } else {
            configuration.setDebitAccount(account);
        }
    }

    function getAllConfigurations() external view returns (IConfiguration[] memory) {
        return allConfigurations;
    }
}
