const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/app.js']

//Swagger documentation
const swaggerOptions = {
    info: {
        version: "1.0.0",
        title: "Docu API",
        description: "API Documentation for use",
        contact: {
            name: "VdG"
        },
    },
    host: "localhost:4000",
    basePath: "/",
    tags: [
        {
            "name": "account",
            "description": "Endpoints"
        }
    ],
};


swaggerAutogen(outputFile, endpointsFiles, swaggerOptions).then(() => {
    require('./src/index')
})


