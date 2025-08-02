import swaggerJSDoc from "swagger-jsdoc";
import {
  accessLogSwaggerSchema,
  appointmentSwaggerSchema,
  appointmentUpdateSwaggerSchema,
  diagnosisSwaggerSchema,
  infoUpdateSwaggerSchema,
  medicalNoteSwaggerSchema,
  medicalNoteUpdateSwaggerSchema,
  messageVerifySwaggerSchema,
  permissionSwaggerSchema,
  permissionUpdateSwaggerSchema,
  prescriptionSwaggerSchema,
  recordImageSwaggerSchema,
  statusSwaggerSchema,
  updateDiagnosisSwaggerSchema,
  updatePrescriptionSwaggerSchema,
  updateRecordImageSwaggerSchema,
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
        name: "Diagnosis - Doctor",
        description: "Doctor endpoints for managing diagnosis.",
      },
      {
        name: "Appointment - Doctor",
        description: "Doctor endpoints for managing appointment.",
      },
      {
        name: "Vital Sign - Doctor",
        description: "Doctor endpoints for managing vital sign.",
      },
      {
        name: "Visit - Doctor",
        description: "Doctor endpoints for managing visit.",
      },
      {
        name: "Lab Result - Doctor",
        description: "Doctor endpoints for managing lab result.",
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
        Diagnosis: diagnosisSwaggerSchema,
        DiagnosisUpdate: updateDiagnosisSwaggerSchema,
        RecordImage: recordImageSwaggerSchema,
        RecordImageUpdate: updateRecordImageSwaggerSchema,
        Prescription: prescriptionSwaggerSchema,
        PrescriptionUpdate: updatePrescriptionSwaggerSchema,
        MedicalNote: medicalNoteSwaggerSchema,
        MedicalNoteUpdate: medicalNoteUpdateSwaggerSchema,
      },
    },
  },
  apis: ["./src/routers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
