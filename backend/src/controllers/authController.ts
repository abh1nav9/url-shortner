import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js"
import { authSchema } from "../validation/inputValidation.js";
import {generateToken} from "../utils/jwtUtility.js"

export const Register = async (req: Request, res: Response) => {
  const parsed = authSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const { email, password } = parsed.data;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "User already exists, please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
      message: `Server error: ${err.message}`,
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  const parsed = authSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const { email, password } = parsed.data;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "User does not exist, please register",
      });
    }

    const isValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(
      existingUser.email,
      existingUser.userUUID
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch(err) {
  console.error("LOGIN ERROR:", err);
  return res.status(500).json({
    message: "Server error",
    error: err instanceof Error ? err.message : err,
  });
}
  }

