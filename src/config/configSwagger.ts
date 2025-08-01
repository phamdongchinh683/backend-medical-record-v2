import swaggerJSDoc from "swagger-jsdoc";
import {
  accessLogSwaggerSchema,
  appointmentSwaggerSchema,
  appointmentUpdateSwaggerSchema,
  infoUpdateSwaggerSchema,
  messageVerifySwaggerSchema,
  permissionSwaggerSchema,
  permissionUpdateSwaggerSchema,
  statusSwaggerSchema,
  userSwaggerSchema,
  visitSwaggerSchema,
  vitalSignSwaggerSchema,
  vitalSignUpdateSwaggerSchema,
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
    tags: [
      {
        name: "Public",
        description: "Public endpoints",
      },
      {
        name: "Auth",
        description: "Authentication and user profile endpoints.",
      },
      {
        name: "Visit - Doctor",
        description: "Doctor endpoints for managing visits.",
      },
      {
        name: "Vital Sign - Doctor",
        description: "Doctor endpoints for managing vital signs.",
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
        User: userSwaggerSchema,
        MessageVerify: messageVerifySwaggerSchema,
        InfoUpdate: infoUpdateSwaggerSchema,
        Status: statusSwaggerSchema,
        Visit: visitSwaggerSchema,
        VitalSign: vitalSignSwaggerSchema,
        VitalSignUpdate: vitalSignUpdateSwaggerSchema,
        AccessLog: accessLogSwaggerSchema,
        Appointment: appointmentSwaggerSchema,
        AppointmentUpdate: appointmentUpdateSwaggerSchema,
        Permission: permissionSwaggerSchema,
        PermissionUpdate: permissionUpdateSwaggerSchema,
      },
    },
  },
  apis: ["./src/routers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
