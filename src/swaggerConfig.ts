// swaggerGenerate.ts

import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "clinic platform API",
      version: "1.0.0",
      description: "API for managing clinic platform API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Bearer Token",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: {
      bearerAuth: [],
    },
  },
  apis: [path.resolve(__dirname, "./routes/*.ts")],
};

export const specs = swaggerJsdoc(options);
