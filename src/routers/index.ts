import { Request, Response, Router } from "express";
import swaggerUi from "swagger-ui-express";
import routers from "../config/configRouters";
import swaggerSpec from "../config/configSwagger";
import { responseStatus } from "../utils/response";

const router = Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use(routers);

router.use((req: Request, res: Response) => {
  responseStatus(res, "error", 404, "URL not found");
});

export default router;
