import { Request, Response, Router } from "express";
import swaggerUi from "swagger-ui-express";
import routers from "../config/configRouters";
import swaggerSpec from "../config/configSwagger";
import { nodeEnv } from "../utils/constants";
import { responseStatus } from "../utils/response";

const router = Router();

// Only enable Swagger UI in development mode
if (nodeEnv === "development") {
  router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

router.use(routers);

router.use((req: Request, res: Response) => {
  responseStatus(res, "error", 404, "URL not found");
});

export default router;
