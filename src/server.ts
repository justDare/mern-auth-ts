import express, { Application, Request, Response, NextFunction } from "express";
import routes from "routes";

export default function createServer() {
  const app: Application = express();
  app.use(express.json({ limit: "50mb" }));

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello world!");
  });

  app.use(routes);
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({ error: error.toString() });
  });

  return app;
}
