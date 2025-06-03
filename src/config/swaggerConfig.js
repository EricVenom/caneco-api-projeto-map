import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API CANECO',
      version: '1.0.0',
      description: 'Documentação da API do Projeto CANECO',
    },
    servers: [
      {
        url: 'https://caneco-api-projeto-map.onrender.com',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};


const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };