import "dotenv/config";
import express, { Application, Request, Response, NextFunction } from "express";
import createServer from "server";
import { connectDB } from "db";
import path from "path";

const startServer = () => {
  const app = createServer();
  const port: number = parseInt(<string>process.env.PORT, 10) || 4000;

  // Serve static assets if in production
  if (process.env.NODE_ENV === "prod") {
    // Set static folder
    app.use(express.static("../client/build"));

    app.get("*", (req, res) => {
      res.sendFile(
        path.resolve(__dirname, "../", "client", "build", "index.html")
      );
    });
  }

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

connectDB().then(() => {
  startServer();
});
