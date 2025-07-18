import { Request, Response, Router } from "express";
import swaggerUi from "swagger-ui-express";
import routers from "../config/configRouters";
import { responseStatus } from "../utils/response";
import swaggerSpec from "../config/configSwagger";

const router = Router();

router.use(routers);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use((req: Request, res: Response) => {
  responseStatus(res, "error", 404, "Not found");
});

export default router;
