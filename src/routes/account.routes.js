const { Router } = require('express');
const  router = Router();



const { getAccount, addAssetAccount, addLiabilityAccount, addResultAccount, getAllAccountDetails } = require('../controllers/account.controllers');

/**
 * @swagger
 * /api/account:
 *   get:
 *     summary: Obtiene todos los detalles de las cuentas contables.
 *     tags: [account]
 *     responses:
 *       200:
 *         description: Un array que contiene todos los detalles de las cuentas contables.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AccountDetails'
 *       500:
 *         description: Error al interactuar con el contrato.
 */
router.get('/', getAllAccountDetails);

/**
 * @swagger
 * /api/account/{address}:
 *   get:
 *     summary: Obtiene el detalle de las cuentas contable consultada.
 *     tags:
 *       - account
 *     description: Endpoint para obter una cuenta contable.
 *     parameters:
 *       - in: path
 *         name: address
 *         description: 'Address: 0x5E4e65926BA27467555EB562121fac00D24E9dD2.'
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Información de la cuenta contable obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AccountDetails'
 *       500:
 *         description: Error al interactuar con el contrato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:address",getAccount);

/**
 * @swagger
 * /api/account/addAssetAccount:
 *   post:
 *     summary: Crea una nueva cuenta de activo.
 *     tags: [account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre de la cuenta de activo.
 *                 example: "Préstamos Otorgados a Largo Plazo"
 *               owner:
 *                 type: string
 *                 description: La dirección del propietario de la cuenta de activo.
 *                 example: "0xea7b8f0c7dbb418963104077f0e2922f72296844"
 *     responses:
 *       201:
 *         description: Cuenta de activo creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tx:
 *                   type: string
 *                   description: El hash de la transacción en la que se creó la cuenta de activo.
 *                   example: "0x00e98fb5208e16685b00fac80d393f51304631701deddd607df4ed338bfb81c6"
 *                 receipt:
 *                   type: object
 *                   properties:
 *                     transactionHash:
 *                       type: string
 *                       description: El hash de la transacción.
 *                       example: "0x00e98fb5208e16685b00fac80d393f51304631701deddd607df4ed338bfb81c6"
 *                     transactionIndex:
 *                       type: integer
 *                       description: El índice de la transacción en el bloque.
 *                       example: 0
 *                     blockHash:
 *                       type: string
 *                       description: El hash del bloque que contiene la transacción.
 *                       example: "0x5c5a04d4de21d3ef03a72a7d53ba1f159c85b8561ca7161fb6d437b0a4437b1a"
 *                     blockNumber:
 *                       type: integer
 *                       description: El número del bloque que contiene la transacción.
 *                       example: 6
 *                     from:
 *                       type: string
 *                       description: La dirección del emisor de la transacción.
 *                       example: "0xea7b8f0c7dbb418963104077f0e2922f72296844"
 *                     to:
 *                       type: string
 *                       description: La dirección del destinatario de la transacción.
 *                       example: "0xb2aab6774565fa26df4c8ab5bbf749285ebd6bdd"
 *                     gasUsed:
 *                       type: integer
 *                       description: La cantidad de gas utilizado en la transacción.
 *                       example: 699945
 *                     cumulativeGasUsed:
 *                       type: integer
 *                       description: La cantidad acumulada de gas utilizado hasta este punto en el bloque.
 *                       example: 699945
 *                     contractAddress:
 *                       type: string
 *                       nullable: true
 *                       description: La dirección del contrato desplegado (si corresponde).
 *                       example: null
 *                     logs:
 *                       type: array
 *                       items: {}
 *                       description: Los eventos emitidos durante la transacción.
 *  
 *       500:
 *         description: Error al interactuar con el contrato.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Detalle del error al interactuar con el contrato.
 *                   example: "Error al interactuar con el contrato: VM Exception while processing transaction: revert"
 */                     
router.post("/addAssetAccount", addAssetAccount);

/**
 * @swagger
 * /api/account/addLiabilityAccount:
 *   post:
 *     summary: Crea una nueva cuenta de pasivo.
 *     tags: [account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre de la cuenta de pasivo.
 *                 example: "Deudas comerciales a pagar"
 *               owner:
 *                 type: string
 *                 description: La dirección del propietario de la cuenta de pasivo.
 *                 example: "0xea7b8f0c7dbb418963104077f0e2922f72296844"
 *     responses:
 *       201:
 *         description: Cuenta de pasivo creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tx:
 *                   type: string
 *                   description: El hash de la transacción en la que se creó la cuenta de pasivo.
 *                   example: "0x00e98fb5208e16685b00fac80d393f51304631701deddd607df4ed338bfb81c6"
 *                 receipt:
 *                   type: object
 *                   properties:
 *                     transactionHash:
 *                       type: string
 *                       description: El hash de la transacción.
 *                       example: "0x00e98fb5208e16685b00fac80d393f51304631701deddd607df4ed338bfb81c6"
 *                     transactionIndex:
 *                       type: integer
 *                       description: El índice de la transacción en el bloque.
 *                       example: 0
 *                     blockHash:
 *                       type: string
 *                       description: El hash del bloque que contiene la transacción.
 *                       example: "0x5c5a04d4de21d3ef03a72a7d53ba1f159c85b8561ca7161fb6d437b0a4437b1a"
 *                     blockNumber:
 *                       type: integer
 *                       description: El número del bloque que contiene la transacción.
 *                       example: 6
 *                     from:
 *                       type: string
 *                       description: La dirección del emisor de la transacción.
 *                       example: "0xea7b8f0c7dbb418963104077f0e2922f72296844"
 *                     to:
 *                       type: string
 *                       description: La dirección del destinatario de la transacción.
 *                       example: "0xb2aab6774565fa26df4c8ab5bbf749285ebd6bdd"
 *                     gasUsed:
 *                       type: integer
 *                       description: La cantidad de gas utilizado en la transacción.
 *                       example: 699945
 *                     cumulativeGasUsed:
 *                       type: integer
 *                       description: La cantidad acumulada de gas utilizado hasta este punto en el bloque.
 *                       example: 699945
 *                     contractAddress:
 *                       type: string
 *                       nullable: true
 *                       description: La dirección del contrato desplegado (si corresponde).
 *                       example: null
 *                     logs:
 *                       type: array
 *                       items: {}
 *                       description: Los eventos emitidos durante la transacción.
 *  
 *       500:
 *         description: Error al interactuar con el contrato.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Detalle del error al interactuar con el contrato.
 *                   example: "Error al interactuar con el contrato: VM Exception while processing transaction: revert"
 */
router.post("/addLiabilityAccount", addLiabilityAccount);

/**
 * @swagger
 * /api/account/addResultAccount:
 *   post:
 *     summary: Crea una nueva cuenta de resultado.
 *     tags: [account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre de la cuenta de resultado.
 *                 example: Intereses ganados  
 *               owner:
 *                 type: string
 *                 description: La dirección del propietario de la cuenta de resultado.
 *                 example: "0xea7b8f0c7dbb418963104077f0e2922f72296844" 
 *               isExpense:
 *                 type: boolean
 *                 description: true o false para indicar si es gasto o beneficio.
 *                 example: false 
 *     responses:
 *       201:
 *         description: Cuenta de resultado creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tx:
 *                   type: string
 *                   description: El hash de la transacción en la que se creó la cuenta de pasivo.
 *                   example: "0x00e98fb5208e16685b00fac80d393f51304631701deddd607df4ed338bfb81c6"
 *                 receipt:
 *                   type: object
 *                   properties:
 *                     transactionHash:
 *                       type: string
 *                       description: El hash de la transacción.
 *                       example: "0x00e98fb5208e16685b00fac80d393f51304631701deddd607df4ed338bfb81c6"
 *                     transactionIndex:
 *                       type: integer
 *                       description: El índice de la transacción en el bloque.
 *                       example: 0
 *                     blockHash:
 *                       type: string
 *                       description: El hash del bloque que contiene la transacción.
 *                       example: "0x5c5a04d4de21d3ef03a72a7d53ba1f159c85b8561ca7161fb6d437b0a4437b1a"
 *                     blockNumber:
 *                       type: integer
 *                       description: El número del bloque que contiene la transacción.
 *                       example: 6
 *                     from:
 *                       type: string
 *                       description: La dirección del emisor de la transacción.
 *                       example: "0xea7b8f0c7dbb418963104077f0e2922f72296844"
 *                     to:
 *                       type: string
 *                       description: La dirección del destinatario de la transacción.
 *                       example: "0xb2aab6774565fa26df4c8ab5bbf749285ebd6bdd"
 *                     gasUsed:
 *                       type: integer
 *                       description: La cantidad de gas utilizado en la transacción.
 *                       example: 699945
 *                     cumulativeGasUsed:
 *                       type: integer
 *                       description: La cantidad acumulada de gas utilizado hasta este punto en el bloque.
 *                       example: 699945
 *                     contractAddress:
 *                       type: string
 *                       nullable: true
 *                       description: La dirección del contrato desplegado (si corresponde).
 *                       example: null
 *                     logs:
 *                       type: array
 *                       items: {}
 *                       description: Los eventos emitidos durante la transacción.
 *  
 *       500:
 *         description: Error al interactuar con el contrato.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Detalle del error al interactuar con el contrato.
 *                   example: "Error al interactuar con el contrato: VM Exception while processing transaction: revert"
 */
router.post("/addResultAccount", addResultAccount);



module.exports = router;