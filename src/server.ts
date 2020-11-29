import express, { Application, Request, Response, NextFunction } from "express";
import routes from "routes";
import path from "path";

export default function createServer() {
  const app: Application = express();
  app.use(express.json({ limit: "50mb" }));

  app.use(routes);

  // Serve static assets if in production
  if (process.env.NODE_ENV === "prod") {
    console.log(`serving production build`);

    // Set static folder
    app.use(express.static("../client/build"));

    app.get("*", (req, res) => {
      res.sendFile(
        path.resolve(__dirname, "../", "client", "build", "index.html")
      );
    });
  }

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({ error: error.toString() });
  });

  return app;
}
