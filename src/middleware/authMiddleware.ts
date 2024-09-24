import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}