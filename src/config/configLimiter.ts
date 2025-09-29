import { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { responseStatus } from "../utils/response";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (req: Request, res: Response) =>
    responseStatus(res, "error", 429, "Too many requests, slow down!"),
});

export default limiter;
