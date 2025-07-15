import joiToSwagger from "joi-to-swagger";
import swaggerJSDoc from "swagger-jsdoc";
import { userSchema } from "../validation/userSchema";

const { swagger: userSwaggerSchema } = joiToSwagger(userSchema);

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
      schemas: {
        User: userSwaggerSchema,
      },
    },
  },
  apis: ["./src/routers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
