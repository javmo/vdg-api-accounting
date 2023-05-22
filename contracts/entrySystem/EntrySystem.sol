// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../accountingSystem/IAccount.sol";
import "./IEntry.sol";
import "./Entry.sol";
import "../configurationSystem/IConfiguration.sol";

contract EntrySystem {

    IEntry[] private allEntry;

    function createEntry(IConfiguration configuration, uint256 amount, bytes32 hash ) external {
        IAccount debitAccount = configuration.getDebitAccount();
        IAccount creditAccount = configuration.getCreditAccount();

        IEntry newEntry = new Entry(debitAccount, creditAccount, amount, hash);
        allEntry.push(newEntry);
    }

    function getAllEntry() external view returns (IEntry[] memory) {
        return allEntry;
    }


}