import joiToSwagger from "joi-to-swagger";
import swaggerJSDoc from "swagger-jsdoc";
import { messageVerifySchema } from "../validation/messageVerifySchema";
import { userSchema } from "../validation/userSchema";
const { swagger: userSwaggerSchema } = joiToSwagger(userSchema);
const { swagger: messageVerifySwaggerSchema } =
  joiToSwagger(messageVerifySchema);

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
      },
    },
  },
  apis: ["./src/routers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
