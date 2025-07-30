// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Express avec SQLite + Upload',
      version: '1.0.0',
      description: 'Documentation des routes de votre API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local',
      },
    ],
  },
  apis: ['./routes/*.js'], // chemins vers tes fichiers de routes
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
