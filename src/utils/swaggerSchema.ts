import joiToSwagger from "joi-to-swagger";

import { accessLogSchema } from "../validation/accessLogSchema";
import {
  appointmentSchema,
  appointmentUpdateSchema,
} from "../validation/appointmentSchema";
import { infoUpdateSchema } from "../validation/infoUpdateSchema";
import { messageVerifySchema } from "../validation/messageVerifySchema";
import {
  permissionSchema,
  updatePermissionSchema,
} from "../validation/permissionSchema";
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
export {
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
};
