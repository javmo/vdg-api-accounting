const { Router } = require('express');
const  router = Router();



const { getAccount, addAssetAccount, addLiabilityAccount, addResultAccount, getAllAccountDetails, getAccountByContract } = require('../controllers/account.controllers');

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
 * /api/account/address/{address}:
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
router.get("/address/:address",getAccount);

/**
 * @swagger
 * /api/account/contract/{contract}:
 *   get:
 *     summary: Obtiene el detalle de las cuentas contable consultado por contract address.
 *     tags:
 *       - account
 *     description: Endpoint para obter una cuenta contable.
 *     parameters:
 *       - in: path
 *         name: contract
 *         description: 'Contract: 0x78c50D6C13A83d9dcd739F0178C289665F30ecE8.'
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
router.get("/contract/:contract", getAccountByContract);

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
 *               $ref: '#/components/schemas/TransactionRawDetails'
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
 *               $ref: '#/components/schemas/TransactionRawDetails'
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
 *               $ref: '#/components/schemas/TransactionRawDetails'
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