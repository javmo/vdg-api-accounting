// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../accountingSystem/IAccount.sol";
/**
 * @title IConfiguration
 * @dev Este contrato es la configuracion de asientos contables.
 */

interface IConfiguration {
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
     * @dev Devuelve la descripcion de la configuracion del asiento.
     * @return string descripcion de la configuracion del asiento.
     */
    function getDescription() external view returns (string memory);

    /**
     * @dev Establece el contrato de la cuenta al debe.
     * @param debitAccount El contrato de la cuenta al debe.
     */
    function setDebitAccount(IAccount debitAccount) external;

    /**
     * @dev Establece el contrato de la cuenta al haber.
     * @param creditAccount El contrato de la cuenta al haber.
     */
    function setCreditAccount(IAccount creditAccount) external;

    /**
     * @dev Establece la descripcion de la configuracion del asiento.
     * @param description La descripcion de la configuracion del asiento.
     */
    function setDescription(string memory description) external;

}
