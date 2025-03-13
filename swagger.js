const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API for user management',
      contact: {
        name: 'API Support'
      },
      servers: [
        { url: 'http://localhost:5000', description: 'Development server' },
        { url: 'https://mern-backend-sapphire.vercel.app', description: 'Production server' }
      ]
    },
    components: {
      securitySchemes: {
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-auth-token'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            dob: { type: 'string', format: 'date' },
            gender: { type: 'string', enum: ['Male', 'Female', 'Other'] },
            address: { type: 'string' }
          }
        }
      }
    },
    security: [{ apiKeyAuth: [] }]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
