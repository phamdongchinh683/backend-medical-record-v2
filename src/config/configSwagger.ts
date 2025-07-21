import swaggerJSDoc from "swagger-jsdoc";
import {
  infoUpdateSwaggerSchema,
  messageVerifySwaggerSchema,
  statusSwaggerSchema,
  userSwaggerSchema,
  visitSwaggerSchema,
  visitUpdateSwaggerSchema,
} from "../utils/swaggerSchema";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Medical Record API",
      version: "1.0.0",
      description: "API documentation for the Medical Record backend",
    },
    servers: [{ url: "http://localhost:3000/api/v1" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: userSwaggerSchema,
        MessageVerify: messageVerifySwaggerSchema,
        InfoUpdate: infoUpdateSwaggerSchema,
        Status: statusSwaggerSchema,
        Visit: visitSwaggerSchema,
        VisitUpdate: visitUpdateSwaggerSchema,
      },
    },
  },
  apis: ["./src/routers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
