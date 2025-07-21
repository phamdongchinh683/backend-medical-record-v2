import { Router } from "express";
import { roleMiddleware } from "../middleware/roleMiddlewares";
import { RoleNumber } from "../utils/enum";

const router = Router();

router.get("/", roleMiddleware(RoleNumber.DOCTOR));

export default router;
