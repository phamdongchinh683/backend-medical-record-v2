import { Router } from "express";
import authRouter from "../routers/authRouter";
import publicRouter from "../routers/publicRouter";
import visitRouter from "../routers/visitRouter";
import vitalSignRouter from "../routers/vitalSignRouter";

const router = Router();
const API_PREFIX = "/api/v1";

const routers = [
  {
    path: `${API_PREFIX}/public`,
    routes: publicRouter,
  },
  {
    path: `${API_PREFIX}/auth`,
    routes: authRouter,
  },
  {
    path: `${API_PREFIX}/visit`,
    routes: visitRouter,
  },
  {
    path: `${API_PREFIX}/vital-sign`,
    routes: vitalSignRouter,
  },
];

routers.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
