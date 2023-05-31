// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IAccount.sol";
import "../tokens/AccountingToken.sol"; 

/**
 * @title LiabilityAccount
 * @dev Contrato para una cuenta de pasivo.
 */
contract LiabilityAccount is IAccount {
    string public accountName;
    address public owner;
    address public tokenAddress;
    AccountingToken private token;

    constructor(string memory _accountName, address _tokenAddress, address instanceAccountingToken) {
        owner = msg.sender;
        accountName = _accountName;
        tokenAddress = _tokenAddress;
        token = AccountingToken(instanceAccountingToken);
    }

    /**
     * @dev Devuelve el nombre de la cuenta.
     * @return string Nombre de la cuenta.
     */
    function getAccountName() external view override returns (string memory) {
        return accountName;
    }

    /**
     * @dev Cambia el nombre de la cuenta.
     * @param _accountName Nuevo nombre de la cuenta.
     */
    function setAccountName(string memory _accountName) public override {
        require(msg.sender == owner, "Only the owner can perform this action.");
        accountName = _accountName;
    }

    /**
     * @dev Debita una cantidad de la cuenta.
     * @param _amount Cantidad a debitar.
     */
    function debit(uint256 _amount) public override {
        require(token.balanceOf(tokenAddress) >= _amount, "Insufficient balance.");
        token.burn(tokenAddress, _amount);
    }

    /**
     * @dev Acredita una cantidad a la cuenta.
     * @param _amount Cantidad a acreditar.
     */
    function credit(uint256 _amount) public override {
        token.mint(tokenAddress, _amount);
    }

    /**
     * @dev Devuelve el balance de la cuenta.
     * @return uint256 Balance de la cuenta.
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
