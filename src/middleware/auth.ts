import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// JWT Config
const jwtSecret = process.env.JWT_SECRET || "";

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);

    // add user from token
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid." });
  }
}

export default auth;
