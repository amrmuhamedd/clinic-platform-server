import { Request, Response, NextFunction } from "express";
import { verifyAndDecodeToken } from "../utils/auth";

const ensureAuthenticatedUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");

  if (!authHeader || authHeader === "") {
    res.status(401).json({
      error: {
        type: "INVALID_TOKEN",
        message: "token was not submitted",
        statusCode: 401,
      },
    });
    return;
  }

  const authHeaderParts = authHeader.split(" ");
  const token = authHeaderParts[1];
  try {
    const tokenPayload = verifyAndDecodeToken(token) as {
      _id: number;
      name: string;
      email: string;
      role: string;
    };
    req.user = tokenPayload;
    next();
    return;
  } catch (e) {
    res.status(401).json({
      error: {
        message: "Invalid Token",
        statusCode: 401,
      },
    });
  }
};

export default ensureAuthenticatedUser;
