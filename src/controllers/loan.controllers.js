const logger = require('../services/logger');
const TruffleContract = require("truffle-contract");
const { provider, web3, getGenesisAddress } = require("../services/web3Config");


// Carga el archivo JSON del contrato compilado EntrySystem
const LoanFactoryJSON = require("../../build/contracts/LoanFactory.json");
const LoanFactory = TruffleContract(LoanFactoryJSON);
LoanFactory.setProvider(provider);

// Carga el archivo JSON del contrato compilado EntrySystem
const LoanJSON = require("../../build/contracts/Loan.json");
const Loan = TruffleContract(LoanJSON);
Loan.setProvider(provider);

// Carga el archivo JSON del contrato compilado EntrySystem
const EntrySystemJSON = require("../../build/contracts/EntrySystem.json");
const EntrySystem = TruffleContract(EntrySystemJSON);
EntrySystem.setProvider(provider);


const createLoanOffer = async (req, res) => {
    try {
        const { amount, interestRate, startLoanEntry, repayLoanEntry, repayInterestLoanEntry } = req.body;
        logger.debug(`amount: ${amount} , interestRate: ${interestRate} `);

        const instanceLoanFactory = await LoanFactory.deployed();

        // cuando creamos billetera enviamos 100 OBT de cortesia 
        const coinbase = await getGenesisAddress();
        const amountFix = web3.utils.toWei(amount, 'ether');
        const interestRateFix = web3.utils.toWei(interestRate, 'ether');
        logger.debug(`amounttowei: ${amountFix} ,interestRatetoWei: ${interestRateFix} `);
        const result = await instanceLoanFactory.createLoan(
            amountFix,
            interestRateFix,
            startLoanEntry,
            repayLoanEntry,
            repayInterestLoanEntry,
            {from: coinbase}
        );

        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

const takeLoanOffer = async (req, res) => {
    try {
        const { owner, loanContract } = req.body;
        const coinbase = await getGenesisAddress();

        logger.debug(`contract config address: ${loanContract} `);
        const loanData = await getLoanData(loanContract);

        const specLoan = await Loan.at(loanContract);
        const resultTxLoan = await specLoan.startLoan(owner, {from: coinbase});
        
        //hacemos el asiento de takeLoan
        const instanceEntrySystem = await EntrySystem.deployed();
        const result = await instanceEntrySystem.createEntry(
            loanData.startLoanEntry,
            web3.utils.toWei(loanData.amount, 'ether'),
            resultTxLoan.tx,
            {from: coinbase}
        );


        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

const payLoan = async (req, res) => {
    try {
        const { owner, loanContract } = req.body;
        const coinbase = await getGenesisAddress();

        logger.debug(`contract config address: ${loanContract} `);

        const specLoan = await Loan.at(loanContract);
        const accruedInterest = await specLoan.calculateInterest();
        const amount = await specLoan.getAmount();
        const totalPay = accruedInterest.add(amount);
        const repayLoanEntry = await specLoan.getRepayLoanEntry();
        const repayInterestLoanEntry = await specLoan.getRepayInterestLoanEntry();
        console.log(web3.utils.fromWei(totalPay, 'ether'))

        const resultTxLoan = await specLoan.repayLoan({from: coinbase});
        
        //hacemos el asiento de pago capital y intereses
        const instanceEntrySystem = await EntrySystem.deployed();
        await instanceEntrySystem.createEntry(
            repayLoanEntry,
            amount,
            resultTxLoan.tx,
            {from: coinbase}
        );

        const result = await instanceEntrySystem.createEntry(
            repayInterestLoanEntry,
            accruedInterest,
            resultTxLoan.tx,
            {from: coinbase}
        );


        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

const getAllLoan = async (req, res) => {
    try {
        const instanceLoanFactory = await LoanFactory.deployed();
        const loanList = await instanceLoanFactory.getAllLoans();

        // Convertir la matriz de cuentas en objetos JSON
        const result = await Promise.all(loanList.map(async loan => {
            const contractAddressLoan = loan;
            const loanDet = getLoanData(contractAddressLoan);

            return loanDet;
        }));

        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

const getAllOffer = async (req, res) => {
    try {
        const instanceLoanFactory = await LoanFactory.deployed();
        const loanList = await instanceLoanFactory.getAllLoans();
        const borrowerAddress = "0x0000000000000000000000000000000000000000";  

        // Convertir la matriz de cuentas en objetos JSON
        const result = await Promise.all(loanList.map(async loan => {
            const contractAddressLoan = loan;
            const loanDet = await getLoanData(contractAddressLoan);

            // Solo incluir el préstamo en los resultados si no está activo y el prestatario coincide
            if (!loanDet.loanActive && loanDet.borrower === borrowerAddress) {
                return loanDet;
            }
        }));

        // Filtrar los resultados para excluir las entradas no definidas
        const filteredResults = result.filter(loan => loan !== undefined);

        res.status(201).send(filteredResults);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

const getActiveByBorrower = async (req, res) => {
    try {
        const borrowerAddress = req.params.borrower;
        const instanceLoanFactory = await LoanFactory.deployed();
        const loanList = await instanceLoanFactory.getAllLoans();

        // Convertir la matriz de cuentas en objetos JSON
        const result = await Promise.all(loanList.map(async loan => {
            const contractAddressLoan = loan;
            const loanDet = await getLoanData(contractAddressLoan);

            // Solo incluir el préstamo en los resultados si está activo y el prestatario coincide
            if (loanDet.loanActive && loanDet.borrower === borrowerAddress) {
                return loanDet;
            }
        }));

        // Filtrar los resultados para excluir las entradas no definidas
        const filteredResults = result.filter(loan => loan !== undefined);

        res.status(200).send(filteredResults);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};


async function getLoanData(contractAddressLoan) {
    // Selecionamos un smart contract especifico IAccount
    const specLoan = await Loan.at(contractAddressLoan);

    const borrower = await specLoan.getBorrower();
    const amount = await specLoan.getAmount();
    const interestRate = await specLoan.getInterestRate();
    const loanStart = await specLoan.getLoanStart();
    const loanActive = await specLoan.getLoanActive();
    let accruedInterest = "0";
    if(loanActive){
        accruedInterest = await specLoan.calculateInterest();
    }
    const startLoanEntry = await specLoan.getStartLoanEntry();
    const repayLoanEntry = await specLoan.getRepayLoanEntry();
    const repayInterestLoanEntry = await specLoan.getRepayInterestLoanEntry();

    return {
        borrower: borrower,
        amount: web3.utils.fromWei(amount, 'ether'),
        interestRate: web3.utils.fromWei(interestRate, 'ether'),
        accruedInterest: web3.utils.fromWei(accruedInterest, 'ether'),
        loanStart: new Date(loanStart * 1000),
        loanActive: loanActive,
        startLoanEntry: startLoanEntry,
        repayLoanEntry: repayLoanEntry,
        repayInterestLoanEntry: repayInterestLoanEntry,
        contract: contractAddressLoan
    };
};

module.exports = {
    takeLoanOffer,
    createLoanOffer,
    getAllLoan,
    payLoan,
    getAllOffer,
    getActiveByBorrower
}