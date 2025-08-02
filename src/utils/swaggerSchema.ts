import joiToSwagger from "joi-to-swagger";

import { accessLogSchema } from "../validation/accessLogSchema";
import {
  appointmentSchema,
  appointmentUpdateSchema,
} from "../validation/appointmentSchema";
import {
  diagnosisSchema,
  updateDiagnosisSchema,
} from "../validation/diagnosisSchema";
import { infoUpdateSchema } from "../validation/infoUpdateSchema";
import {
  labResultSchema,
  labResultUpdateSchema,
} from "../validation/labResultSchema";
import {
  medicalNoteSchema,
  medicalNoteUpdateSchema,
} from "../validation/medicalNoteSchema";
import { messageVerifySchema } from "../validation/messageVerifySchema";
import {
  permissionSchema,
  updatePermissionSchema,
} from "../validation/permissionSchema";
import {
  prescriptionSchema,
  prescriptionUpdateSchema,
} from "../validation/prescriptionSchema";
import {
  recordImageSchema,
  recordImageUpdateSchema,
} from "../validation/recordImageSchema";
import { statusSchema } from "../validation/statusSchema";
import { userSchema } from "../validation/userSchema";
import { visitSchema } from "../validation/visitSchema";
import { vitalSignSchema } from "../validation/vitalSignSchema";
import { vitalSignUpdateSchema } from "../validation/vitalSignUpdateSchema";

const { swagger: userSwaggerSchema } = joiToSwagger(userSchema);
const { swagger: messageVerifySwaggerSchema } =
  joiToSwagger(messageVerifySchema);
const { swagger: infoUpdateSwaggerSchema } = joiToSwagger(infoUpdateSchema);
const { swagger: statusSwaggerSchema } = joiToSwagger(statusSchema);
const { swagger: visitSwaggerSchema } = joiToSwagger(visitSchema);
const { swagger: vitalSignSwaggerSchema } = joiToSwagger(vitalSignSchema);
const { swagger: vitalSignUpdateSwaggerSchema } = joiToSwagger(
  vitalSignUpdateSchema
);
const { swagger: accessLogSwaggerSchema } = joiToSwagger(accessLogSchema);
const { swagger: appointmentSwaggerSchema } = joiToSwagger(appointmentSchema);
const { swagger: appointmentUpdateSwaggerSchema } = joiToSwagger(
  appointmentUpdateSchema
);
const { swagger: permissionSwaggerSchema } = joiToSwagger(permissionSchema);
const { swagger: permissionUpdateSwaggerSchema } = joiToSwagger(
  updatePermissionSchema
);
const { swagger: diagnosisSwaggerSchema } = joiToSwagger(diagnosisSchema);
const { swagger: updateDiagnosisSwaggerSchema } = joiToSwagger(
  updateDiagnosisSchema
);
const { swagger: prescriptionSwaggerSchema } = joiToSwagger(prescriptionSchema);
const { swagger: updatePrescriptionSwaggerSchema } = joiToSwagger(
  prescriptionUpdateSchema
);
const { swagger: recordImageSwaggerSchema } = joiToSwagger(recordImageSchema);
const { swagger: updateRecordImageSwaggerSchema } = joiToSwagger(
  recordImageUpdateSchema
);
const { swagger: labResultSwaggerSchema } = joiToSwagger(labResultSchema);
const { swagger: updateLabResultSwaggerSchema } = joiToSwagger(
  labResultUpdateSchema
);

const { swagger: medicalNoteSwaggerSchema } = joiToSwagger(medicalNoteSchema);
const { swagger: medicalNoteUpdateSwaggerSchema } = joiToSwagger(
  medicalNoteUpdateSchema
);

export {
  accessLogSwaggerSchema,
  appointmentSwaggerSchema,
  appointmentUpdateSwaggerSchema,
  diagnosisSwaggerSchema,
  infoUpdateSwaggerSchema,
  labResultSwaggerSchema,
  medicalNoteSwaggerSchema,
  medicalNoteUpdateSwaggerSchema,
  messageVerifySwaggerSchema,
  permissionSwaggerSchema,
  permissionUpdateSwaggerSchema,
  prescriptionSwaggerSchema,
  recordImageSwaggerSchema,
  statusSwaggerSchema,
  updateDiagnosisSwaggerSchema,
  updateLabResultSwaggerSchema,
  updatePrescriptionSwaggerSchema,
  updateRecordImageSwaggerSchema,
  userSwaggerSchema,
  visitSwaggerSchema,
  vitalSignSwaggerSchema,
  vitalSignUpdateSwaggerSchema,
};
