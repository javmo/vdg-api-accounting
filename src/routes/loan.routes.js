const { Router } = require('express');
const  router = Router();

const { createLoanOffer, takeLoanOffer, getAllLoan, payLoan, getAllOffer, getActiveByBorrower } = require('../controllers/loan.controllers');

/**
 * @swagger
 * /api/loan:
 *   post:
 *     summary: Create a new loan offer
 *     tags: [loan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *               interestRate:
 *                 type: string
 *               startLoanEntry:
 *                 type: string
 *               repayLoanEntry:
 *                 type: string
 *               repayInterestLoanEntry:
 *                 type: string
 *             example:
 *               amount: "1000"
 *               interestRate: "0.1"
 *               startLoanEntry: "0x78c50D6C13A83d9dcd739F0178C289665F30ecE8"
 *               repayLoanEntry: "0x78c50D6C13A83d9dcd739F0178C289665F30ecE8"
 *               repayInterestLoanEntry: "0x78c50D6C13A83d9dcd739F0178C289665F30ecE8"
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionRawDetails'
 *       500:
 *         description: Error interacting with the contract
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *             example:
 *               error: "Error interacting with the contract"
 */
router.post('/', createLoanOffer);

/**
 * @swagger
 * /api/loan:
 *   get:
 *     summary: Obtiene todos los préstamos
 *     tags: [loan]
 *     description: Obtiene una lista de todos los préstamos disponibles.
 *     responses:
 *       200:
 *         description: Lista de todos los préstamos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LoanDetails'
 *             example:
 *               - borrower: "0xb79eefa1d6f53db6b6727be38a1154c0488b9a70"
 *                 amount: "1000.00"
 *                 interestRate: "5.00"
 *                 accruedInterest: "50.00"
 *                 loanStart: "2023-05-20T13:28:35.592Z"
 *                 loanActive: true
 *                 startLoanEntry: "0x5644c123456789abc2d4d0da2d4e00ff6592f015"
 *                 repayLoanEntry: "0x5644c123456789abc2d4d0da2d4e00ff6592f016"
 *                 repayInterestLoanEntry: "0x5644c123456789abc2d4d0da2d4e00ff6592f017"
 *                 contract: "0x5644c123456789abc2d4d0da2d4e00ff6592f018"
 *       500:
 *         description: Error al interactuar con el contrato
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getAllLoan);


/**
 * @swagger
 * /api/loan/getAllOffer:
 *   get:
 *     summary: Obtén una lista de todas las ofertas de préstamos inactivas para un prestatario específico.
 *     tags: [loan]
 *     description: Lista de todas las ofertas de préstamos disponibles
 *     responses:
 *       '200':
 *         description: La operación fue exitosa. Retorna una lista de ofertas de préstamos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LoanDetails'
 *       '500':
 *         description: Hubo un error al interactuar con el contrato.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse' 
 */
router.get('/getAllOffer/', getAllOffer);

/**
 * @swagger
 * /api/loan/getActiveByBorrower/{borrower}:
 *   get:
 *     tags: [loan]
 *     summary: Get list of active loans for a specific borrower
 *     description: This can only be done by the logged in user.
 *     operationId: getActiveLoansForBorrower
 *     parameters:
 *       - name: borrower
 *         in: path
 *         description: Address of the borrower to return active loans for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 *       500:
 *         description: Error occurred while fetching loans
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/getActiveByBorrower/:borrower', getActiveByBorrower);



/**
 * @swagger
 * /api/loan/takeLoanOffer:
 *   post:
 *     summary: Toma una oferta de préstamo
 *     tags: [loan]
 *     description: Toma una oferta de préstamo a partir de un contrato de préstamo específico.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *                 description: Propietario que toma la oferta de préstamo.
 *               loanContract:
 *                 type: string
 *                 description: Dirección del contrato de préstamo.
 *             required:
 *               - owner
 *               - loanContract
 *     responses:
 *       201:
 *         description: Préstamo tomado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionRawDetails'
 *       500:
 *         description: Error al interactuar con el contrato
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/takeLoanOffer', takeLoanOffer );

/**
 * @swagger
 * /api/loan/payLoan:
 *   post:
 *     summary: Paga el préstamo.
 *     tags: [loan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *                 description: La dirección del propietario de la cuenta contable en la blockchain.
 *               loanContract:
 *                 type: string
 *                 description: La dirección del contrato de préstamo en la blockchain.
 *             required:
 *               - owner
 *               - loanContract
 *     responses:
 *       '201':
 *         description: Préstamo pagado con éxito. Retorna detalles de la transacción.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionRawDetails'
 *       '500':
 *         description: Hubo un error al interactuar con el contrato.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/payLoan', payLoan );


module.exports = router;