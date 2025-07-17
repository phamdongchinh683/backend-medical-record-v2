import jwt from "jsonwebtoken";
import { IPayload } from "../types/IPayload";
import { jwtSecret } from "./constants";

function generateToken(payload: any): string {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET_KEY environment variable is not set");
  }
  return jwt.sign(payload, jwtSecret, { expiresIn: "2h" });
}

function verifyToken(token: string): IPayload | null {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET_KEY environment variable is not set");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as IPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("JWT verification failed:", error.message);
      return null;
    }
    if (error instanceof jwt.TokenExpiredError) {
      console.error("JWT token expired");
      return null;
    }
    console.error("JWT verification error:", error);
    return null;
  }
}

export { generateToken, verifyToken };
