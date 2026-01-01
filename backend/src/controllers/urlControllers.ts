import type { Request, Response } from "express";
import Url from "../models/url.js";
import { generateCode } from "../utils/generateCode.js";

export const shortenUrl = async (req: Request, res: Response) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: "URL required" });
  }

  let url = await Url.findOne({ originalUrl });

  // 👇 FIX: return shortUrl even if it already exists
  if (url) {
    return res.json({
      ...url.toObject(),
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`
    });
  }

  const shortCode = generateCode();
  url = await Url.create({ originalUrl, shortCode });

  return res.status(201).json({
    ...url.toObject(),
    shortUrl: `${process.env.BASE_URL}/${shortCode}`
  });
};

export const redirectUrl = async (req: Request, res: Response) => {
  const code = req.params.code;

  if (!code) {
    return res.status(400).json({ message: "Code is required" });
  }

  const url = await Url.findOne({ shortCode: code });
  if (!url) return res.status(404).json({ message: "Not found" });

  url.clicks += 1;
  await url.save();

  return res.redirect(url.originalUrl);
};
