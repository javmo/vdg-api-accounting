// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IAccount.sol";
import "../tokens/AccountingToken.sol"; 

/**
 * @title ResultAccount
 * @dev Contrato para la cuenta de resultados de una empresa.
 */
contract ResultAccount is IAccount {
    string public accountName;
    address public owner;
    bool public isExpense;
    address public tokenAddress;
    AccountingToken private token;


    /**
     * @dev Crea una nueva instancia de ResultAccount.
     * @param _accountName Nombre de la cuenta.
     * @param _isExpense Indica si la cuenta es de gasto o ingreso.
     */
    constructor(string memory _accountName, bool _isExpense, address _tokenAddress, address instanceAccountingToken) {
        owner = msg.sender;
        accountName = _accountName;
        isExpense = _isExpense;
        tokenAddress = _tokenAddress;
        token = AccountingToken(instanceAccountingToken);
    }

    /**
     * @dev Obtiene el nombre de la cuenta.
     * @return El nombre de la cuenta.
     */
    function getAccountName() external view override returns (string memory) {
        return accountName;
    }

    /**
     * @dev Establece el nombre de la cuenta.
     * @param _accountName Nuevo nombre de la cuenta.
     */
    function setAccountName(string memory _accountName) public override {
        require(msg.sender == owner, "Only the owner can perform this action.");
        accountName = _accountName;
    }

    /**
     * @dev Realiza un débito en la cuenta.
     * @param _amount Monto a debitar en la cuenta.
     */
    function debit(uint256 _amount) public override {
        if (isExpense) {
            token.mint(tokenAddress, _amount);
        } else {
            require(token.balanceOf(tokenAddress) >= _amount, "Insufficient balance.");
            token.burn(tokenAddress, _amount);
        }
    }

    /**
     * @dev Realiza un crédito en la cuenta.
     * @param _amount Monto a acreditar en la cuenta.
     */
    function credit(uint256 _amount) public override {
        if (isExpense) {
            require(token.balanceOf(tokenAddress) >= _amount, "Insufficient balance.");
            token.burn(tokenAddress, _amount);
        } else {
            token.mint(tokenAddress, _amount);
        }
    }

    /**
     * @dev Obtiene el balance actual de la cuenta.
     * @return El balance de la cuenta.
     */
    function getBalance() external view override returns (uint256) {
        return token.balanceOf(tokenAddress);
    }

    /**
     * @dev Devuelve el token address.
     * @return addess Nombre de la cuenta.
     */
    function getTokenAddress() external view override returns (address) {
        return tokenAddress;
    }
}
