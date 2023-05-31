const { Router } = require('express');
const  router = Router();

const { createEntry, getAllEntry, getEntryByContract } = require('../controllers/entry.controllers');

/**
 * @swagger
 * /api/entry/{configurationContract}:
 *   post:
 *     summary: Crea una nueva entrada en el sistema de contabilidad.
 *     tags: [entry]
 *     parameters:
 *       - in: path
 *         name: configurationContract
 *         description: Dirección del contrato de configuración.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *                 description: Monto de la transacción.
 *                 example: "10000"
 *               hash:
 *                 type: string
 *                 description: Hash asociado a la transacción.
 *     responses:
 *       201:
 *         description: Entrada creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionRawDetails'
 *       500:
 *         description: Error al interactuar con el contrato.
 */
router.post("/:configurationContract", createEntry);

/**
 * @swagger
 * /api/entry/contract/{contract}:
 *   get:
 *     summary: Obtiene la información de una entrada específica por su dirección de contrato.
 *     tags: [entry]
 *     parameters:
 *       - in: path
 *         name: contract
 *         description: Dirección del contrato de la entrada.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información de la entrada solicitada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EntryDetails'
 *       500:
 *         description: Error al interactuar con el contrato.
 */
router.get("/contract/:contract", getEntryByContract);

/**
 * @swagger
 * /api/entry:
 *   get:
 *     summary: Obtiene la información de todas las entradas en el sistema de contabilidad.
 *     tags: [entry]
 *     responses:
 *       200:
 *         description: Lista de todas las entradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EntryDetails'
 *       500:
 *         description: Error al interactuar con el contrato.
 */
router.get("/", getAllEntry);

module.exports = router;