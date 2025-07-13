import jwt from "jsonwebtoken";
import { IPayload } from "../types/IPayload";
import { expireTime, jwtSecret } from "./constants";

function generateToken(payload: IPayload): string {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  if (!expireTime) {
    throw new Error("EXPIRE_TIME environment variable is not set");
  }

  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}

function verifyToken(token: string): any {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  return jwt.verify(token, jwtSecret);
}

export { generateToken, verifyToken };
