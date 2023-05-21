// swaggerConfig.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VDG-API-ACCOUNTING',
      version: '1.0.0',
      description: `Esta API permite interactuar con una serie de smart contracts en la blockchain, diseñados para llevar la contabilidad de forma segura y descentralizada. 
  Los usuarios pueden realizar diversas operaciones contables, como crear cuentas, registrar transacciones y consultar balances. 
  La aplicación aprovecha las ventajas de la tecnología blockchain para proporcionar un sistema de contabilidad transparente, inmutable y fácilmente auditable.`
    },
    components: {
      schemas: {
        AccountDetails: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'El nombre de la cuenta contable.',
            },
            balance: {
              type: 'string',
              format: 'float',
              description: 'El saldo actual de la cuenta contable.',
            },
            type: {
              type: 'string',
              description: 'El tipo de cuenta contable (activo o pasivo).',
            },
            account: {
              type: 'string',
              description: 'La dirección de la cuenta contable en la blockchain.',
            },
            contract: {
              type: 'string',
              description: 'La dirección del contrato inteligente asociado a la cuenta contable.',
            },
          },
        },
        Configuration: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
              description: 'Descripción de la configuración del asiento contable.',
            },
            debitAccountContract: {
              type: 'string',
              description: 'Dirección del contrato de la cuenta al debe.',
              format: 'address',
            },
            creditAccountContract: {
              type: 'string',
              description: 'Dirección del contrato de la cuenta al haber.',
              format: 'address',
            },
            contract: {
              type: 'string',
              description: 'Dirección del contrato de la configuración del asiento.',
              format: 'address',
            },
          },
          required: ['description', 'debitAccountContract', 'creditAccountContract', 'contract'],
        },
        WalletDetails: {
          type: 'object',
          properties: {
            address: {
              type: 'string',
              description: 'La dirección de la cuenta contable en la blockchain',
            },
            privateKey: {
              type: 'string',
              description: 'El tipo de cuenta contable (activo o pasivo).',
            },
          },
        },
        TransactionDetails: {
          type: 'object',
          properties: {
            hash: {
              type: 'string',
              description: 'Hash de la operacion en la blockchain',
            },
            from: {
              type: 'string',
              description: 'La dirección de la cuenta FROM',
            },
            to: {
              type: 'string',
              description: 'La dirección de la cuenta TO',
            },
            value: {
              type: 'string',
              format: 'float',
              description: 'valor del movimiento o operacion en la blockchain.',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'timestamp'
            },
          },
        },
        EntryDetails: {
          type: 'object',
          properties: {
            debitAccountContract: {
              type: 'string',
              description: 'Dirección del contrato de la cuenta al debe.',
              format: 'address',
            },
            creditAccountContract: {
              type: 'string',
              description: 'Dirección del contrato de la cuenta al haber.',
              format: 'address',
            },
            amount: {
              type: 'string',
              format: 'float',
              description: 'Importe contabilizado',
            },
            hash: {
              type: 'string',
              description: 'hash de la operacion relacionada al asiento.',
            },
            contract: {
              type: 'string',
              description: 'Dirección del contrato de la configuración del asiento.',
              format: 'address',
            },
          },
          required: ['description', 'debitAccountContract', 'creditAccountContract', 'contract'],
        },
        LoanDetails: {
          type: 'object',
          properties: {
            borrower: {
              type: 'string',
              description: 'ID or Name of the borrower',
            },
            amount: {
              type: 'string',
              format: 'float',
              description: 'Amount of the loan',
            },
            interestRate: {
              type: 'string',
              format: 'float',
              description: 'Interest rate for the loan',
            },
            accruedInterest: {
              type: 'string',
              format: 'float',
              description: 'Interest rate for the loan',
            },
            loanStart: {
              type: 'string',
              format: 'date-time',
              description: 'Start date of the loan',
            },
            loanActive: {
              type: 'boolean',
              description: 'Whether the loan is active or not',
            },
            startLoanEntry: {
              type: 'string',
              description: 'Entry of the start of the loan',
            },
            repayLoanEntry: {
              type: 'string',
              description: 'Entry of the repayment of the loan',
            },
            repayInterestLoanEntry: {
              type: 'string',
              description: 'Entry of the repayment of interest of the loan',
            },
            contract: {
              type: 'string',
              description: 'Contract address for the loan',
            },
          },
          required: ['borrower', 'amount', 'interestRate', 'loanStart', 'loanActive', 'startLoanEntry', 'repayLoanEntry', 'repayInterestLoanEntry', 'contract'],
        },
        TransactionRawDetails: {
          type: 'object',
          properties: {
            tx: {
              type: 'string',
              description: 'The transaction hash.',
            },
            receipt: {
              type: 'object',
              properties: {
                transactionHash: {
                  type: 'string',
                  description: 'The transaction hash.',
                },
                transactionIndex: {
                  type: 'integer',
                  format: 'int64',
                  description: 'Index of the transaction.',
                },
                blockHash: {
                  type: 'string',
                  description: 'Hash of the block where this transaction was in.',
                },
                blockNumber: {
                  type: 'integer',
                  format: 'int64',
                  description: 'Block number where this transaction was in.',
                },
                from: {
                  type: 'string',
                  description: 'Address of the sender.',
                },
                to: {
                  type: 'string',
                  description: 'Address of the receiver.',
                },
                gasUsed: {
                  type: 'integer',
                  format: 'int64',
                  description: 'The amount of gas used by this specific transaction alone.',
                },
                cumulativeGasUsed: {
                  type: 'integer',
                  format: 'int64',
                  description: 'The total amount of gas used when this transaction was executed in the block.',
                },
                contractAddress: {
                  type: 'string',
                  nullable: true,
                  description: 'The contract address created, if the transaction was a contract creation, otherwise null.',
                },
                logs: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description: 'Array of log events generated by this transaction.',
                },
              },
            },
          },
          required: ['tx', 'receipt'],
        },
        ErrorResponse: {
          type: "object",
          properties: {
              error: {
                  type: "string",
                  description: "Descripción del error",
              },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Aquí debes especificar la ruta donde se encuentran los archivos con tus comentarios de Swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec
};



