import { Router } from "express";
import accessLogRouter from "../routers/accessLogRouter";
import appointmentRouter from "../routers/appointmentRouter";
import authRouter from "../routers/authRouter";
import diagnosisRouter from "../routers/diagnosisRouter";
import permissionRouter from "../routers/PermissionRouter";
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
  {
    path: `${API_PREFIX}/access-log`,
    routes: accessLogRouter,
  },
  {
    path: `${API_PREFIX}/appointment`,
    routes: appointmentRouter,
  },
  {
    path: `${API_PREFIX}/permission`,
    routes: permissionRouter,
  },
  { path: `${API_PREFIX}/diagnosis`, routes: diagnosisRouter },
];

routers.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
