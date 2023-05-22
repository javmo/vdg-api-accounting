const logger = require('../services/logger');
const TruffleContract = require("truffle-contract");
const { provider, web3, getGenesisAddress } = require("../services/web3Config");

// Carga el archivo JSON del contrato compilado AccountigSystem
const AccountingSystemJSON = require("../../build/contracts/AccountingSystem.json");
const AccountingSystem = TruffleContract(AccountingSystemJSON);
AccountingSystem.setProvider(provider);

// Carga el archivo JSON del contrato compilado IAccount
const IAccountJSON = require("../../build/contracts/IAccount.json");
const IAccount = TruffleContract(IAccountJSON);
IAccount.setProvider(provider);



const getAccount = async (req, res) => {
    try {
        const address = req.params.address;
        logger.debug(`:book: busco Account con address: ${address} `);

        const instanceAccountingSystem = await AccountingSystem.deployed();
        const accountDetails = await instanceAccountingSystem.getAccountDetails(address);
        
        const contractAddressAccount = accountDetails['0'];
        const accountTypeIndex = accountDetails['1'].toNumber();
        

        // Selecionamos un smart contract especifico IAccount
  

        const result = await getAccountsData(contractAddressAccount, accountTypeIndex, address);

  
        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }

};

const getAccountByContract = async (req, res) => {
    try {
        const contract = req.params.contract;
        logger.debug(`:book: busco Account con contract: ${contract} `);
        const specInstIAccount = await IAccount.at(contract);
        const addressToken = await specInstIAccount.getTokenAddress();

        const instanceAccountingSystem = await AccountingSystem.deployed();
        const accountDetails = await instanceAccountingSystem.getAccountDetails(addressToken);
        
        const accountTypeIndex = accountDetails['1'].toNumber();
        
        // Selecionamos un smart contract especifico IAccount
  
        const result = await getAccountsData(contract, accountTypeIndex, addressToken);

  
        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }

};


const addAssetAccount = async (req, res) => {
    try {
        const { name, owner } = req.body;
        logger.debug(`name: ${name} , owner: ${owner} `);

        const instanceAccountingSystem = await AccountingSystem.deployed();
        const coinbase = await getGenesisAddress();
        const result = await instanceAccountingSystem.createAssetAccount(owner, name, {from: coinbase});
        

        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

const addLiabilityAccount = async (req, res) => {
    try {
        const { name, owner } = req.body;
        const coinbase = await getGenesisAddress();
        const instanceAccountigSystem = await AccountingSystem.deployed();
        const result = await instanceAccountigSystem.createLiabilityAccount(owner, name, { from: coinbase } );
        

        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

const addResultAccount = async (req, res) => {
    try {
        const { owner, name, isExpense } = req.body;
        const coinbase = await getGenesisAddress();
        const instanceAccountigSystem = await AccountingSystem.deployed();
        const result = await instanceAccountigSystem.createResultAccount(owner, name, isExpense, { from: coinbase } );
        

        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

const getAllAccountDetails = async (req, res) => {
    try {
        const instanceAccountingSystem = await AccountingSystem.deployed();
        const accountsList = await instanceAccountingSystem.getAllAccountDetails();

        // Convertir la matriz de cuentas en objetos JSON
        const result = await Promise.all(accountsList.map(async account => {
            const contractAddressAccount = await instanceAccountingSystem.getAccountInstance(account[0]);
            const accountTypeIndex = parseInt(account[1]);
            const accountDet = getAccountsData(contractAddressAccount, accountTypeIndex, account[0]);

            return accountDet;
        }));

        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

// funciones axuiliares para tratar el ENUM
const AccountType = {
    NONE: 0,
    ASSET: 1,
    LIABILITY: 2,
    RESULT: 3,
};

function accountTypeToString(accountTypeIndex) {
    return Object.keys(AccountType).find((key) => AccountType[key] === accountTypeIndex);
}
// funciones axuiliares para tratar el ENUM

// funciona axiliar para armar el json de cuenta
async function getAccountsData(contractAddressAccount, accountTypeIndex, accountAddress) {
    const accountType = accountTypeToString(accountTypeIndex);
    // Selecionamos un smart contract especifico IAccount
    logger.debug(`contract address: ${contractAddressAccount}, accountTypeIndex: ${accountTypeIndex} `);
    const specInstIAccount = await IAccount.at(contractAddressAccount);
    const accountName = await specInstIAccount.getAccountName();
    const accountBalance = await specInstIAccount.getBalance();

    return {
        name: accountName,
        balance: web3.utils.fromWei(accountBalance, 'ether'),
        type: accountType,
        account: accountAddress,
        contract: contractAddressAccount
    };
}


module.exports = {
    getAccount,
    addAssetAccount,
    addLiabilityAccount,
    addResultAccount,
    getAllAccountDetails,
    getAccountByContract
}