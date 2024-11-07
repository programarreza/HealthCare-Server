import { Router } from "express";
import adminRoutes from "../modules/admin/admin.routes";
import userRoutes from "../modules/user/user.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/admins",
    route: adminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
