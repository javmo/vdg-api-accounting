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
              type: 'number',
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
              type: 'number',
              description: 'valor del movimiento o operacion en la blockchain.',
            },
            timestamp: {
              type: 'timestamp',
              description: 'timestamp.',
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
              type: 'number',
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



