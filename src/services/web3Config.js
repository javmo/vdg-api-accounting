const Web3 = require("web3");
const logger = require('../services/logger');
const HDWalletProvider = require("@truffle/hdwallet-provider");
let rpcUrl = "";

if (process.env.NODE_ENV === 'production') {
  // En producción, usa una URL RPC diferente
  rpcUrl = process.env.RPC_PROD;
  console.log(rpcUrl);
} else {
  // En desarrollo, usa tu nodo local
  const rpcHost = process.env.RPC_HOST || '127.0.0.1';
  const rpcPort = process.env.RPC_PORT || 8545;
  rpcUrl = `http://${rpcHost}:${rpcPort}`;
}

// Configura el proveedor de Web3 y la instancia del contrato
const web3 = new Web3(rpcUrl);


let provider;

if (process.env.NODE_ENV === 'production') {
    provider = new HDWalletProvider(process.env.MNEMONIC, rpcUrl);
} else {
    provider = new Web3.providers.HttpProvider(rpcUrl);
}



web3.eth.getNodeInfo()
    .then(nodeInfo => {
        logger.info(`:rocket: Blockchain is connected, node: ${nodeInfo} , RPC_HOST:${rpcUrl}`);
    })
    .catch(e => {
        logger.warn(`:no_entry:  Blockchain offline-` + e);
    });

// Se busca si hay una address en las variables de ambiente sino se usa la coinbase de la blockchain
const getGenesisAddress = async () => {
  if (process.env.NODE_ENV === 'production') {
    const genesisAddress = process.env.GENESIS_ADDRESS;
    
    logger.info(`:key: calling a contract with Genesis Address: ${genesisAddress} `);
    return genesisAddress;
  } else {
    const genesisAddress = await web3.eth.getCoinbase();
    logger.info(`:key: calling a contract with Genesis Address: ${genesisAddress}`);
    return genesisAddress;
  }
};


module.exports = {
    provider,
    web3,
    getGenesisAddress
};