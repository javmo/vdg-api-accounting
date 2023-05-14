const logger = require('../services/logger');
const TruffleContract = require("truffle-contract");
const { provider, web3, getGenesisAddress } = require("../services/web3Config");


// Carga el archivo JSON del contrato compilado EntrySystem
const ObligationTokenJSON = require("../../build/contracts/ObligationToken.json");
const ObligationToken = TruffleContract(ObligationTokenJSON);
ObligationToken.setProvider(provider);


const createWallet = async (req, res) => {
    try {
        const account = web3.eth.accounts.create();
        logger.debug(`account: ${account.address} , account.privately: ${account.privateKey} `);

        // cuando creamos billetera enviamos 100 OBT de cortesia 
        const coinbase = await getGenesisAddress();
        const instanceObligationToken = await ObligationToken.deployed();
        const gitfAmount = web3.utils.toWei('100', 'ether');
        await instanceObligationToken.transfer(
            account.address,
            gitfAmount,
            {from: coinbase}
        )


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

        const instanceObligationToken = await ObligationToken.deployed();
        const tokenTransferEvents = await instanceObligationToken.getPastEvents('allEvents', {
            fromBlock: startBlock,
            toBlock: 'latest',
            filter: {
                from: address,
                to: address,
            },
        });

        tokenTransferEvents.forEach((event) => {
            if (event.returnValues.from === address || event.returnValues.to === address){
                transactions.push({
                    hash: event.transactionHash,
                    from: event.returnValues.from,
                    to: event.returnValues.to,
                    value: web3.utils.fromWei(event.returnValues.value, 'ether'),
                    timestamp: event.blockTimestamp * 1000,
                });

            }
            
        });

        res.status(201).send(transactions);

    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
  };

  const getBalance = async (req, res) => {
    try {
        const address  = req.params.address
        const ethBalance = await web3.eth.getBalance(address);
        const formattedEthBalance = web3.utils.fromWei(ethBalance, 'ether');

        const instanceObligationToken = await ObligationToken.deployed();
        const tokenBalance = await instanceObligationToken.balanceOf(address, {from: address} );
        const formattedObtBalance = web3.utils.fromWei(tokenBalance, 'ether');

        res.status(201).send({
            ethBalance: formattedEthBalance,
            tokenBalance: formattedObtBalance
        });

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