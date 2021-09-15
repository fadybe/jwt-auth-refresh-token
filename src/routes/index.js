import express from "express";

import usersRouter from "./users.js";
import authRouter from "./auth.js";

const routers = express.Router();

routers.use("/users", usersRouter);
routers.use("/auth", authRouter);

export default routers;
