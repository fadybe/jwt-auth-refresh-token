import express from "express";

import { auth, checkRole } from "../middleware/auth.js";
import controller from "../controllers/users.js";
import Roles from "../constants/roles.js";

const router = express.Router();

router.get("/public", controller.publicContent);

router.get(
  "/private_user",
  auth,
  checkRole(Roles.User),
  controller.userContent
);

router.get(
  "/private_moderator",
  auth,
  checkRole(Roles.Moderator),
  controller.moderatorContent
);

router.get(
  "/private_admin",
  auth,
  checkRole(Roles.Admin),
  controller.adminContent
);

export default router;
