import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Finance Management System API",
      version: "1.0.0",
      description:
        "Finance Management System Backend API Documentation",
    },

    servers: [
      {
        url: "http://localhost:8000/api/v1",
      },
    ],

    components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },

  schemas: {
    LoginRequest: {
      type: "object",

      required: [
        "email",
        "password"
      ],

      properties: {
        email: {
          type: "string",
          example: "john@gmail.com",
        },

        password: {
          type: "string",
          example: "Password123@",
        },
      },
    },
  },
},

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/modules/**/*.ts",
  ],
};

export const swaggerSpec =
  swaggerJsdoc(options);