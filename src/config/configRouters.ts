import { Router } from "express";
import authRouter from "../routers/authRouter";
const router = Router();
const API_PREFIX = "/api/v1";

const routers = [
  {
    path: `${API_PREFIX}/auth`,
    routes: authRouter,
  },
];

routers.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
