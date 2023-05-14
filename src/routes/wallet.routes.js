const { Router } = require('express');
const  router = Router();

const { createWallet, getTransactions, getBalance, loadWallet  } = require('../controllers/wallet.controllers');

/**
 * @swagger
 * /api/wallet:
 *   post:
 *     summary: Crea una address en la blockchain.
 *     tags: [wallet]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exampleField:
 *                 type: string
 *                 description: Un ejemplo de campo en la solicitud (si es necesario).
 *     responses:
 *       200:
 *         description: Wallet blockchain.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/WalletDetails'
 *       500:
 *         description: Error al interactuar con el contrato.
 */
router.post('/', createWallet);

/**
 * @swagger
 * /api/wallet/{privateKey}:
 *   get:
 *     summary: Obtiene address por privateKey.
 *     tags: [wallet]
 *     parameters:
 *       - in: path
 *         name: privateKey
 *         description: 'Ejemplo de privateKey: 0x78c50D6C13A83d9dcd739F0178C289665F30ecE8.'
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wallet blockchain.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/WalletDetails'
 *       500:
 *         description: Error al interactuar con el contrato.
 */
router.get('/:privateKey', loadWallet);


/**
 * @swagger
 * /api/wallet/balance/{address}:
 *   get:
 *     summary: Obtiene balance de address.
 *     tags: [wallet]
 *     parameters:
 *       - in: path
 *         name: address
 *         description: 'Ejemplo de address: 0x78c50D6C13A83d9dcd739F0178C289665F30ecE8.'
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wallet blockchain.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   description: Balance en ETH.
 *               
 *       500:
 *         description: Error al interactuar con el contrato.
 */
router.get('/balance/:address', getBalance);

/**
 * @swagger
 * /api/wallet/transaction/{address}:
 *   get:
 *     summary: Obtiene todas las transacciones de una address.
 *     tags: [wallet]
 *     parameters:
 *       - in: path
 *         name: address
 *         description: 'Ejemplo de address: 0x78c50D6C13A83d9dcd739F0178C289665F30ecE8.'
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wallet blockchain.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TransactionDetails' 
 *       500:
 *         description: Error al interactuar con el contrato.
 */
router.get('/transaction/:address', getTransactions);

module.exports = router;