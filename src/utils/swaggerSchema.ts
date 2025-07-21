import joiToSwagger from "joi-to-swagger";

import { visitUpdateSchema } from "../validation/visitUpdateSchema";
import { infoUpdateSchema } from "../validation/infoUpdateSchema";
import { messageVerifySchema } from "../validation/messageVerifySchema";
import { statusSchema } from "../validation/statusSchema";
import { userSchema } from "../validation/userSchema";
import { visitSchema } from "../validation/visitSchema";
const { swagger: userSwaggerSchema } = joiToSwagger(userSchema);
const { swagger: messageVerifySwaggerSchema } =
  joiToSwagger(messageVerifySchema);
const { swagger: infoUpdateSwaggerSchema } = joiToSwagger(infoUpdateSchema);
const { swagger: statusSwaggerSchema } = joiToSwagger(statusSchema);
const { swagger: visitSwaggerSchema } = joiToSwagger(visitSchema);
const { swagger: visitUpdateSwaggerSchema } = joiToSwagger(visitUpdateSchema);
export {
  infoUpdateSwaggerSchema,
  messageVerifySwaggerSchema,
  statusSwaggerSchema,
  userSwaggerSchema,
  visitSwaggerSchema,
  visitUpdateSwaggerSchema
};
