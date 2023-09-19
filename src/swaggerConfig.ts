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
  },
  apis: [path.resolve(__dirname, "./routes/*.ts")],
};

export const specs = swaggerJsdoc(options);
