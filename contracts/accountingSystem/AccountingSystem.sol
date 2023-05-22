// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IAccount.sol";
import "./AssetAccount.sol";
import "./LiabilityAccount.sol";
import "./ResultAccount.sol";
import "../tokens/AccountingToken.sol";

/**
 * @title AccountingSystem
 * @dev Este contrato permite la gestión de cuentas de activos y resultados.
 */

contract AccountingSystem {
    address public owner;
    mapping(address => IAccount) public accounts;
    mapping(address => AccountType) public accountTypes;
    AccountingToken private token;

    enum AccountType {
        NONE,
        ASSET,
        LIABILITY,
        RESULT
    }


    //  un array de direcciones de cuentas.
    address[] public accountAddresses;


    /**
     * @dev Constructor que establece el propietario del contrato.
     */
    constructor(AccountingToken _token) {
        owner = msg.sender;
        token = _token;
    }

    /**
     * @notice Crea una nueva cuenta de activos.
     * @dev Crea una nueva instancia de AssetAccount y la almacena en el mapping.
     * @param _accountAddress La dirección que se utilizará como clave para la cuenta.
     * @param _accountName El nombre de la cuenta.
     */
    function createAssetAccount(
        address _accountAddress,
        string memory _accountName
    ) public {
        require(msg.sender == owner, "Only the owner can perform this action.");
        require(
            address(accounts[_accountAddress]) == address(0),
            "Account with this address already exists."
        );
        AssetAccount newAccount = new AssetAccount(_accountName, _accountAddress, address(token));
        accounts[_accountAddress] = IAccount(address(newAccount));
        accountTypes[_accountAddress] = AccountType.ASSET;
        accountAddresses.push(_accountAddress);
    }

    /**
     * @notice Crea una nueva cuenta de Pasivo.
     * @dev Crea una nueva instancia de LiabilityAccount y la almacena en el mapping.
     * @param _accountAddress La dirección que se utilizará como clave para la cuenta.
     * @param _accountName El nombre de la cuenta.
     */
    function createLiabilityAccount(
        address _accountAddress,
        string memory _accountName
    ) public {
        require(msg.sender == owner, "Only the owner can perform this action.");
        require(
            address(accounts[_accountAddress]) == address(0),
            "LiabilityAccount with this address already exists."
        );
        LiabilityAccount newLiabilitytAccount = new LiabilityAccount(
            _accountName,  _accountAddress, address(token)
        );
        accounts[_accountAddress] = IAccount(address(newLiabilitytAccount));
        accountTypes[_accountAddress] = AccountType.LIABILITY;
        accountAddresses.push(_accountAddress); 
    }

    /**
     * @notice Crea una nueva cuenta de resultados.
     * @dev Crea una nueva instancia de ResultAccount y la almacena en el mapping.
     * @param _accountAddress La dirección que se utilizará como clave para la cuenta.
     * @param _accountName El nombre de la cuenta.
     * @param _isExpense Indica si la cuenta es de gastos o ingresos.
     */
    function createResultAccount(
        address _accountAddress,
        string memory _accountName,
        bool _isExpense
    ) public {
        require(msg.sender == owner, "Only the owner can perform this action.");
        require(
            address(accounts[_accountAddress]) == address(0),
            "ResultAccount with this address already exists."
        );
        ResultAccount newResultAccount = new ResultAccount(
            _accountName,
            _isExpense,
            _accountAddress,
            address(token)
        );
        accounts[_accountAddress] = IAccount(address(newResultAccount));
        accountTypes[_accountAddress] = AccountType.RESULT;
        accountAddresses.push(_accountAddress);
    }

    // Agrega funciones para crear otros tipos de cuentas si es necesario.

    /**
     * @notice Obtiene los detalles de una cuenta específica.
     * @dev Retorna la dirección del contrato de la cuenta y el tipo de cuenta.
     * @param _accountAddress La dirección de la cuenta a consultar.
     * @return La dirección del contrato de la cuenta y el tipo de cuenta.
     */
    function getAccountDetails(address _accountAddress)
        public
        view
        returns (address, AccountType)
    {
        require(
            address(accounts[_accountAddress]) != address(0),
            "Account not found."
        );
        return (
            address(accounts[_accountAddress]),
            accountTypes[_accountAddress]
        );
    }

    /**
     * @notice Actualiza el nombre de una cuenta.
     * @dev Actualiza el nombre de la cuenta en la instancia del contrato de la cuenta.
     * @param _accountAddress La dirección de la cuenta a actualizar.
     * @param _newAccountName El nuevo nombre para la cuenta.
     */
    function updateAccountName(
        address _accountAddress,
        string memory _newAccountName
    ) public {
        require(msg.sender == owner, "Only the owner can perform this action.");
        require(
            address(accounts[_accountAddress]) != address(0),
            "Account not found."
        );
        IAccount account = accounts[_accountAddress];
        account.setAccountName(_newAccountName);
    }

    // Agrega funciones de actualización para otros atributos de la cuenta si es necesario.

    /**
     * @notice Obtiene todas las direcciones de cuentas de activos o pasivos o resultados.
     * @dev Retorna un array de direcciones de cuentas de activos o pasivos o resultados según el parámetro.
     * @return Un array de direcciones de cuentas y un array de tipos de cuentas.
     */
    function getAllAccountDetails() public view returns (AccountDetails[] memory) {
    uint256 accountCount = accountAddresses.length;
    AccountDetails[] memory accountDetails = new AccountDetails[](accountCount);

    for (uint256 i = 0; i < accountCount; i++) {
        address accountAddress = accountAddresses[i];
        if (address(accounts[accountAddress]) != address(0)) {
            accountDetails[i].accountAddress = accountAddress;
            accountDetails[i].accountType = accountTypes[accountAddress];
        }
    }
    return accountDetails;
    }


    struct AccountDetails {
    address accountAddress;
    AccountType accountType;
    }


    /**
     * @notice Obtiene la instancia del contrato de una cuenta.
     * @dev Retorna la instancia del contrato de una cuenta específica.
     * @param _accountAddress Direccion asociada a la cuenta contable
     * @return La dirección del contrato de la cuenta.
     */

    function getAccountInstance(address _accountAddress)
        public
        view
        returns (IAccount)
    {
        IAccount accountInstance = accounts[_accountAddress];
        require(address(accountInstance) != address(0), "Account not found.");
        return accountInstance;
    }
}
