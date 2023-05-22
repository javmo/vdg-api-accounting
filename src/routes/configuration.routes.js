const { Router } = require('express');
const  router = Router();

const { createConfiguration, getAllConfigurations, setConfigurationAccount, getConfigurationByContract } = require('../controllers/configuration.controllers');

/**
 * @swagger
 * /api/configuration:
 *   get:
 *     summary: Obtiene todos los detalles de las configuraiones de asientos.
 *     tags: [configuration]
 *     responses:
 *       200:
 *         description: Un array que contiene todas las configuraiones de asientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Configuration'
 *       500:
 *         description: Error al interactuar con el contrato.
 */
router.get('/', getAllConfigurations);

/**
 * @swagger
 * /api/configuration/contract/{contract}:
 *   get:
 *     summary: Obtiene el detalle de la configuracion de asiento consultado por contract address.
 *     tags:
 *       - configuration
 *     description: Endpoint para obter una configuracion.
 *     parameters:
 *       - in: path
 *         name: contract
 *         description: 'Contract: 0x78c50D6C13A83d9dcd739F0178C289665F30ecE8.'
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Información de la configuracion obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Configuration'
 *       500:
 *         description: Error al interactuar con el contrato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/contract/:contract", getConfigurationByContract);

/**
 * @swagger
 * /api/configuration:
 *   post:
 *     summary: Crea una nueva configuracion de asiento.
 *     tags: [configuration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: El descriptcion del asiento o de la configuracion.
 *                 example: "Alta y desembolso de prestamo"
 *               owner:
 *                 type: string
 *                 description: La dirección del propietario de la cuenta.
 *                 example: "0xea7b8f0c7dbb418963104077f0e2922f72296844"
 *     responses:
 *       201:
 *         description: configuracion de asiento creada con éxito.
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
router.post("/", createConfiguration);

/**
 * @swagger
 * /api/configuration:
 *   patch:
 *     summary: Setea cuenta Debe o Haber de  la configuracion del asiento.
 *     tags: [configuration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               configurationContract:
 *                 type: string
 *                 description: direccion del contrato de configuraionc.
 *                 example: "0x78c50D6C13A83d9dcd739F0178C289665F30ecE8"
 *               accountContract:
 *                 type: string
 *                 description: La dirección del contrato de una cuenta contable IAccount.
 *                 example: "0xea7b8f0c7dbb418963104077f0e2922f72296844"
 *               isCredit:
 *                 type: boolean
 *                 description: true o false para indicar si se configura al debe o al haber.
 *                 example: false 
 *               owner:
 *                 type: string
 *                 description: La dirección del propietario de la cuenta.
 *                 example: "0xea7b8f0c7dbb418963104077f0e2922f72296844"
 *     responses:
 *       201:
 *         description: configuracion de asiento actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionRawDetails'
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
router.patch("/", setConfigurationAccount);

module.exports = router;