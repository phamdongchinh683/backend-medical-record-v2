import { IPayload } from "../IPayload";

declare global {
  namespace Express {
    interface Request {
      user?: IPayload;
      address?: string;
    }
  }
}
