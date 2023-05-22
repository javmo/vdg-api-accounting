// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../accountingSystem/IAccount.sol";
import "./IConfiguration.sol";

contract Configuration is IConfiguration {
    IAccount private _debitAccount;
    IAccount private _creditAccount;
    uint256 private _amount;
    string private _description;

    constructor(
        string memory description
    ) {
        _description = description;
    }

    function getDebitAccount() external view override returns (IAccount) {
        return _debitAccount;
    }

    function getCreditAccount() external view override returns (IAccount) {
        return _creditAccount;
    }

    function getDescription() external view override returns (string memory) {
        return _description;
    }

    function setDebitAccount(IAccount debitAccount) external override {
        _debitAccount = debitAccount;
    }

    function setCreditAccount(IAccount creditAccount) external override {
        _creditAccount = creditAccount;
    }

    function setDescription(string memory description) external override {
        _description = description;
    }
}