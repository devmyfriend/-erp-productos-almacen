export const options = {                                                                                                        definition: {
    openapi: '3.0.0',
    info: {
            title: 'ERP-API PRODUCTOS Y ALMACÉN',
            version: '1.0.0',
            description: 'ERP-API',
    },
    servers: [

            {
                    url: 'http://localhost:5000',
            },
            {
                    url: 'http://lachosoft.cloud:7000/',
            }

    ],
},
apis: ['./src/routes/*.js'],
};