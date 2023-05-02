// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title AccountingSystem
 * @dev Este contrato permite la gestión de cuentas.
 */

interface IAccount {
    /**
     * @dev Devuelve el nombre de la cuenta.
     * @return El nombre de la cuenta.
     */
    function getAccountName() external view returns (string memory);
    /**
     * @dev Debita una cantidad de la cuenta.
     * @param _amount La cantidad a debitar.
     */
    function debit(uint256 _amount) external;
    /**
     * @dev Acredita una cantidad a la cuenta.
     * @param _amount La cantidad a acreditar.
     */
    function credit(uint256 _amount) external;
    /**
     * @dev Devuelve el saldo de la cuenta.
     * @return El saldo de la cuenta.
     */
    function getBalance() external view returns (uint256);
    /**
     * @dev Actualiza el nombre de la cuenta.
     * @param _accountName El nuevo nombre de la cuenta.
     */
    function setAccountName(string memory _accountName) external;
    /**
     * @dev Devuelve el addres vinculad tokenAddress.
     * @return El nombre de la cuenta.
     */
    function getTokenAddress() external view returns (address);

}
