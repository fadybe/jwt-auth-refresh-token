import express from "express";

import controller from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.post("/refresh_token", controller.refreshToken);

export default router;
