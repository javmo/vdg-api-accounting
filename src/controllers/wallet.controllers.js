const logger = require('../services/logger');
const { provider, web3, getGenesisAddress } = require("../services/web3Config");


const createWallet = async (req, res) => {
    try {
        const account = web3.eth.accounts.create();
        logger.debug(`account: ${account.address} , account.privately: ${account.privateKey} `);
        res.status(201).send(account);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

const getTransactions = async (req, res) => {
    try {
        const address = req.params.address
        const currentBlockNumber = await web3.eth.getBlockNumber();
        const startBlock = Math.max(currentBlockNumber - 10000, 0); // Reemplaza 10000 con el número de bloques que deseas revisar
        const transactions = [];
  
        for (let blockNumber = startBlock; blockNumber <= currentBlockNumber; blockNumber++) {
        const block = await web3.eth.getBlock(blockNumber, true);
      
  
        block.transactions.forEach((transaction) => {
            if (transaction.from === address || transaction.to === address) {
        
            transactions.push({
                hash: transaction.hash,
                from: transaction.from,
                to: transaction.to,
                value: web3.utils.fromWei(transaction.value, 'ether'),
                timestamp: transaction.timestamp * 1000,
            });
            }
        });
        }
        res.status(201).send(transactions);

    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
  };

  const getBalance = async (req, res) => {
    try {
        const address  = req.params.address
        const balance = await web3.eth.getBalance(address);
        res.status(201).send( { balance: web3.utils.fromWei(balance, 'ether') } );

    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
  }

  const loadWallet = async (req, res) => {
    try {
        const privateKey = req.params.privateKey;
        const address = await web3.eth.accounts.privateKeyToAccount(privateKey);
        res.status(201).send(address);

    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
  }

module.exports = {
    createWallet,
    getTransactions,
    getBalance,
    loadWallet
}