// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IAccount.sol";
import "../tokens/AccountingToken.sol"; 
/**
 * @title AssetAccount
 * @dev Este contrato implementa la interfaz IAccount y representa una cuenta de activos en un sistema de contabilidad.
 */

contract AssetAccount is IAccount {
    string public accountName;
    address public owner;
    uint256 public balance;
    address public tokenAddress;
    AccountingToken private token;
    uint8 public constant decimals = 18;

    /**
     * @dev Constructor de la cuenta de activos que establece el nombre de la cuenta y el propietario.
     * @param _accountName El nombre de la cuenta.
     * @param _tokenAddress addres de los tokens
     */

    constructor(string memory _accountName, address _tokenAddress, address instanceAccountingToken ) {
        owner = msg.sender;
        accountName = _accountName;
        tokenAddress = _tokenAddress;
        token = AccountingToken(instanceAccountingToken);
    }


    /**
     * @dev Devuelve el nombre de la cuenta.
     * @return El nombre de la cuenta.
     */
    function getAccountName() external view override returns (string memory) {
        return accountName;
    }

    /**
     * @dev Actualiza el nombre de la cuenta.
     * @param _accountName El nuevo nombre de la cuenta.
     */
    function setAccountName(string memory _accountName) public override {
        require(msg.sender == owner, "Only the owner can perform this action.");
        accountName = _accountName;
    }
    event DebugAmount(uint256 amount);
    event DebugTokenAmount(uint256 tokenAmount);

    /**
     * @dev Debita una cantidad de la cuenta.
     * @param _amount La cantidad a debitar.
     */
    function debit(uint256 _amount) public override {
        emit DebugAmount(_amount);
        uint256 tokenAmount = toTokenUnits(_amount);
        emit DebugTokenAmount(tokenAmount);
        token.mint(tokenAddress, tokenAmount);
        balance += _amount;
    }

    /**
     * @dev Acredita una cantidad a la cuenta.
     * @param _amount La cantidad a acreditar.
     */
    function credit(uint256 _amount) public override {
        uint256 tokenAmount = toTokenUnits(_amount);
        require(balance >= _amount, "Insufficient balance.");
        token.burn(tokenAddress, tokenAmount);
        balance -= _amount;
    }
    
    /**
     * @dev Devuelve el saldo actual de la cuenta.
     * @return El saldo actual de la cuenta.
     */
    function getBalance() external view override returns (uint256) {
        return balance;
    }

    /**
     * @dev Devuelve el token address.
     * @return addess Nombre de la cuenta.
     */
    function getTokenAddress() external view override returns (address) {
        return tokenAddress;
    }

    function toTokenUnits(uint256 amount) internal pure returns (uint256) {
    return amount * (10 ** decimals);
    }

}
