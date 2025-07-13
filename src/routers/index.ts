import { Request, Response, Router } from "express";
import routers from "../config/configRouters";
import { responseStatus } from "../utils/response";

const router = Router();

router.use(routers);

router.use((req: Request, res: Response) => {
  responseStatus(res, "error", 404, "Not found");
});

export default router;
