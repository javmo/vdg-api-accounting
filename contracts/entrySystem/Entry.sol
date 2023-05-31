// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IEntry.sol";
import "../accountingSystem/IAccount.sol";

contract Entry is IEntry {
    IAccount private _debitAccount;
    IAccount private _creditAccount;
    uint256 private _amount;
    bytes32 private _hash;

    event EntryAdded(
        address indexed debitAccount,
        string debitAccountName,
        address indexed creditAccount,
        string creditAccountName,
        uint256 amount,
        bytes32 hash
    );


    constructor(IAccount debitAccount, IAccount creditAccount, uint256 amount, bytes32 hash) {
        _debitAccount = debitAccount;
        _creditAccount = creditAccount;
        _amount = amount;
        _hash = hash;
        debitAccount.debit(amount);
        creditAccount.credit(amount);

        emit EntryAdded(
            debitAccount.getTokenAddress(),
            debitAccount.getAccountName(),
            creditAccount.getTokenAddress(),
            creditAccount.getAccountName(),
            amount,
            hash
        );
    }

    function getDebitAccount() external view override returns (IAccount) {
        return _debitAccount;
    }

    function getCreditAccount() external view override returns (IAccount) {
        return _creditAccount;
    }

    function getAmount() external view override returns (uint256) {
        return _amount;
    }

    function getHash() external view override returns (bytes32) {
        return _hash;
    }
}