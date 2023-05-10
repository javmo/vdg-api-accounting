const logger = require('../services/logger');
const TruffleContract = require("truffle-contract");
const { provider, web3, getGenesisAddress } = require("../services/web3Config");

// Carga el archivo JSON del contrato compilado AccountigSystem
const ConfigurationSystemJSON = require("../../build/contracts/ConfigurationSystem.json");
const ConfigurationSystem = TruffleContract(ConfigurationSystemJSON);
ConfigurationSystem.setProvider(provider);

// Carga el archivo JSON del contrato compilado IConfigurationJSON
const IConfigurationJSON = require("../../build/contracts/IConfiguration.json");
const IConfiguration = TruffleContract(IConfigurationJSON);
IConfiguration.setProvider(provider);



const createConfiguration = async (req, res) => {
    try {
        const { description, owner } = req.body;
        logger.debug(`description: ${description} , owner: ${owner} `);

        const instanceConfigurationSystem = await ConfigurationSystem.deployed();
        const coinbase = await getGenesisAddress();
        const result = await instanceConfigurationSystem.createConfiguration(description, {from: coinbase});
        

        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

const setConfigurationAccount = async (req, res) => {
    try {
        const { configurationContract, accountContract, isCredit , owner } = req.body;
        logger.debug(`
        configurationContract: ${configurationContract} 
        , accountContract: ${accountContract} 
        isCredit: ${isCredit} 
        owner: ${owner}
        `);

        const instanceConfigurationSystem = await ConfigurationSystem.deployed();
        const coinbase = await getGenesisAddress();
        const result = await instanceConfigurationSystem.setAccount(
            configurationContract,
            accountContract,
            isCredit,
             {from: coinbase}
            );
        

        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

const getConfigurationByContract = async (req, res) => {
    try {
        const contract = req.params.contract;
        logger.debug(`:book: busco Configuration con contract: ${contract} `);
        
        // Selecionamos un smart contract especifico IAccount
  
        const result = await getConfigurationData(contract);

  
        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }

};

const getAllConfigurations = async (req, res) => {
    try {
        const instanceConfigurationSystem = await ConfigurationSystem.deployed();
        const configurationList = await instanceConfigurationSystem.getAllConfigurations();

        // Convertir la matriz de cuentas en objetos JSON
        const result = await Promise.all(configurationList.map(async configuration => {
            console.log(configuration);
            const contractAddressConfiguration = configuration;
            const accountDet = getConfigurationData(contractAddressConfiguration);

            return accountDet;
        }));

        logger.debug(JSON.stringify(result));
        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

async function getConfigurationData(contractAddressConfiguration) {
    // Selecionamos un smart contract especifico IAccount
    logger.debug(`contract config address: ${contractAddressConfiguration} `);
    const specIConfiguration = await IConfiguration.at(contractAddressConfiguration);
    const description = await specIConfiguration.getDescription();
    const debitAccountContract = await specIConfiguration.getDebitAccount();
    const creditAccountContract = await specIConfiguration.getCreditAccount();

    return {
        description: description,
        debitAccountContract:debitAccountContract,
        creditAccountContract: creditAccountContract,
        contract: contractAddressConfiguration
    };
}


module.exports = {
    createConfiguration,
    getAllConfigurations,
    setConfigurationAccount,
    getConfigurationByContract
}