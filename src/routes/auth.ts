import { Router, Request, Response, NextFunction } from "express";
import User from "models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "middleware/auth";

const jwtSecret: string = process.env.JWT_SECRET || "";

const router: Router = Router();

const validUser = (body: any) => {
  const { user_name, email, password, confirm_password } = body;

  const has_name = typeof user_name == "string" && user_name.trim() != "";
  const has_email = typeof email == "string" && email.trim() != "";
  const has_password = typeof password == "string" && password.trim() != "";
  const confirm_password_matches = password === confirm_password;

  return has_name && has_email && has_password && confirm_password_matches;
};

// @route POST /auth
// @desc  Authenticate User
// @access Public
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || email.trim() === "")
      return res.status(400).json("No email provided.");
    if (typeof password !== "string" || password.trim() === "")
      return res.status(400).json("No password provided.");

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json("User does not exist");

    const password_valid = await bcrypt.compare(password, user.password);

    if (!password_valid) return res.status(400).json("Password incorrect");

    const token = await jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: 3600,
    });

    return res.json({
      token,
      user: {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        register_date: user.register_date,
      },
    });
  } catch (err) {
    next(err);
  }
});

// @route GET /auth/user
// @desc  Get a user
// @access Private
router.get(
  "/user",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.user?.id).select("-password");
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

// @route POST /auth/user
// @desc  Add User
// @access Public
router.post(
  "/user",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validUser(req.body)) {
        const found = await User.findOne({ email: req.body.email });

        if (found) return res.status(400).json("User already exists.");

        const newUser = new User({
          user_name: req.body.user_name,
          email: req.body.email,
          password: req.body.password,
        });

        const hash = await bcrypt.hash(req.body.password, 10);

        newUser.password = hash;
        await newUser.save();

        const token = await jwt.sign({ id: newUser.id }, jwtSecret, {
          expiresIn: 3600,
        });

        return res.json({
          token,
          user: {
            id: newUser.id,
            user_name: newUser.user_name,
            email: newUser.email,
            register_date: newUser.register_date,
          },
        });
      } else {
        return res.status(400).json("Invalid parameters.");
      }
    } catch (err) {
      next(err);
    }
  }
);

export default router;
