import express from "express";

import routers from "./routes/index.js";

const app = express();
app.use(express.json());
app.use("/api", routers);

app.use((req, res, next) => {
  next(new Error("Route not found."));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json(err.message);
});

export default app;
