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
        console.log(coinbase);
        await instanceObligationToken.transfer(
            account.address,
            gitfAmount,
            { from: coinbase }
        )


        res.status(201).send(account);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};


const getBalance = async (req, res) => {
    try {
        const address = req.params.address
        const ethBalance = await web3.eth.getBalance(address);
        const formattedEthBalance = web3.utils.fromWei(ethBalance, 'ether');

        const instanceObligationToken = await ObligationToken.deployed();
        const tokenBalance = await instanceObligationToken.balanceOf(address, { from: address });
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

const getTransactions = async (req, res) => {
    try {
        const address = req.params.address;
        const currentBlockNumber = await web3.eth.getBlockNumber();
        const startBlock = Math.max(currentBlockNumber - 10000, 0);

        //const etherTransactions = await getEtherTransactions(address, startBlock, currentBlockNumber);
        const tokenTransactions = await getTokenTransactions(address, startBlock);
       // const transactions = etherTransactions.concat(tokenTransactions);
       tokenTransactions.sort((a, b) => a.timestamp - b.timestamp);

        res.status(200).send(tokenTransactions);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

const getEtherTransactions = async (address, startBlock, currentBlockNumber) => {
    const transactions = [];

    for (let blockNumber = startBlock; blockNumber <= currentBlockNumber; blockNumber++) {
        const block = await web3.eth.getBlock(blockNumber, true);

        for (const transaction of block.transactions) {
            if (transaction.from === address || transaction.to === address) {
                const timestamp = await getBlockTimestamp(transaction.blockNumber);
                let value = web3.utils.fromWei(transaction.value, 'ether');
                if (transaction.from === address) {
                    value = -value;
                }

                transactions.push({
                    hash: transaction.hash,
                    from: transaction.from,
                    to: transaction.to,
                    value: value,
                    timestamp: new Date(timestamp * 1000),
                });
            }
        }
    }

    return transactions;
};

const getTokenTransactions = async (address, startBlock) => {
    const instanceObligationToken = await ObligationToken.deployed();
    const tokenTransferEvents = await instanceObligationToken.getPastEvents('allEvents', {
        fromBlock: startBlock,
        toBlock: 'latest',
        filter: {
            from: address,
            to: address,
        },
    });

    const transactions = [];

    for (const event of tokenTransferEvents) {
        if (event.returnValues.from === address || event.returnValues.to === address) {
            const timestamp = await getBlockTimestamp(event.blockNumber);

            let value = web3.utils.fromWei(event.returnValues.value, 'ether');
            if (event.returnValues.from === address) {
                value = -value;
            }

            transactions.push({
                hash: event.transactionHash,
                from: event.returnValues.from,
                to: event.returnValues.to,
                value: value,
                timestamp: new Date(timestamp * 1000),
            });
        }
    }

    return transactions;
};
const getBlockTimestamp = async (blockNumber) => {
    const block = await web3.eth.getBlock(blockNumber);
    return block.timestamp;
};

module.exports = {
    createWallet,
    getTransactions,
    getBalance,
    loadWallet
}