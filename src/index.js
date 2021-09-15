import http from "http";

import database from "./database/database.js";
import app from "./app.js";

const port = process.env.PORT || 3000;

app.set("port", port);

const server = http.createServer(app);

const bootstrap = async () => {
  await database.connect();
  await server.listen(app.get("port"));
  console.log(`Server is up and running on port: ${port}`);
};

bootstrap();
