import { Router } from "express";
import authRouter from "../routers/authRouter";
import publicRouter from "../routers/publicRouter";
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
];

routers.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
