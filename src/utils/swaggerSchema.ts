import joiToSwagger from "joi-to-swagger";

import { infoUpdateSchema } from "../validation/infoUpdateSchema";
import { messageVerifySchema } from "../validation/messageVerifySchema";
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
export {
  infoUpdateSwaggerSchema,
  messageVerifySwaggerSchema,
  statusSwaggerSchema,
  userSwaggerSchema,
  visitSwaggerSchema,
  vitalSignSwaggerSchema,
  vitalSignUpdateSwaggerSchema,
};
