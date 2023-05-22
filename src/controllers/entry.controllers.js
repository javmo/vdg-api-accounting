const logger = require('../services/logger');
const TruffleContract = require("truffle-contract");
const { provider, web3, getGenesisAddress } = require("../services/web3Config");

// Carga el archivo JSON del contrato compilado EntrySystem
const EntrySystemJSON = require("../../build/contracts/EntrySystem.json");
const EntrySystem = TruffleContract(EntrySystemJSON);
EntrySystem.setProvider(provider);

// Carga el archivo JSON del contrato compilado IEntryJSON
const IEntryJSON = require("../../build/contracts/IEntry.json");
const IEntry = TruffleContract(IEntryJSON);
IEntry.setProvider(provider);

// Carga el archivo JSON del contrato compilado IConfigurationJSON
const IConfigurationJSON = require("../../build/contracts/IConfiguration.json");
const IConfiguration = TruffleContract(IConfigurationJSON);
IConfiguration.setProvider(provider);



const createEntry = async (req, res) => {
    try {
        const configurationContract = req.params.configurationContract;
        const { amount, hash } = req.body;
        logger.debug(`configurationContract: ${configurationContract} 
        amount: ${amount}
        hash: ${hash}
        `);
        const amountFix = web3.utils.toWei(amount, 'ether');

        const instanceEntrySystem = await EntrySystem.deployed();
        const coinbase = await getGenesisAddress();
        const result = await instanceEntrySystem.createEntry(
            configurationContract,
            amountFix,
            hash,
            {from: coinbase}
            );
        

        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

const getEntryByContract = async (req, res) => {
    try {
        const contract = req.params.contract;
        logger.debug(`:book: busco entry con contract: ${contract} `);
  
        const result = await getEntryData(contract);

  
        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }

};

const getAllEntry = async (req, res) => {
    try {
        const instanceEntrySystem = await EntrySystem.deployed();
        const entryList = await instanceEntrySystem.getAllEntry();

        // Convertir la matriz de cuentas en objetos JSON
        const result = await Promise.all(entryList.map(async entry => {
            const contractAddressEntry = entry;
            const entryDet = getEntryData(contractAddressEntry);

            return entryDet;
        }));

        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

async function getEntryData(contractAddressEntry) {
    // Selecionamos un smart contract especifico IAccount
    logger.debug(`contract config address: ${contractAddressEntry} `);
    const specIEntry = await IEntry.at(contractAddressEntry);

    const debitAccountContract = await specIEntry.getDebitAccount();
    const creditAccountContract = await specIEntry.getCreditAccount();
    const amount = await specIEntry.getAmount();
    const hash = await specIEntry.getHash();

    return {
        debitAccountContract:debitAccountContract,
        creditAccountContract: creditAccountContract,
        amount: web3.utils.fromWei(amount, 'ether'),
        hash: hash,
        contract: contractAddressEntry
    };
}


module.exports = {
    createEntry,
    getAllEntry,
    getEntryByContract
}