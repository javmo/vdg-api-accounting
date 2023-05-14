// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../accountingSystem/IAccount.sol";
/**
 * @title IEntry
 * @dev Este contrato es la interfaz de asientos.
 */

interface IEntry {
    /**
     * @dev Devuelve el contrato de la cuenta al debe.
     * @return IAccount al debe.
     */
    function getDebitAccount() external view returns (IAccount);

    /**
     * @dev Devuelve el contrato de la cuenta al haber.
     * @return IAccount al haber.
     */
    function getCreditAccount() external view returns (IAccount);

    /**
     * @dev Devuelve el importe del asiento.
     * @return importe del asiento.
     */
    function getAmount() external view returns (uint256);

    /**
     * @dev Devuelve el hash asociado al asientor.
     * @return bytes32 el hash.
     */
    function getHash() external view returns (bytes32);

}
