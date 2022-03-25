import { ResponseMessages } from "./../constants/messages.constants";

import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.json({
      data: null,
      status: "error",
      message: ResponseMessages.wentWrong,
    });
  }

  jwt.verify(token, process.env.JWT_TOKEN_SECRET || "secret", (err, userId) => {
    if (err) {
      return res.json({
        data: null,
        status: "error",
        message: err.message,
      });
    }

    req.session.userId = Number(userId);

    next();
  });
};
