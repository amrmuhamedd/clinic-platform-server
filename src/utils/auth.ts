import jwt, { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserRolesEnum } from "../enums/userRole.enum";
import { Types } from "mongoose";

const secretKey = process.env.SECRET_KEY as string;

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export const verifyAndDecodeToken = (token: string) => {
  let decodedPayload;
  if (!secretKey) throw new Error("Unauthorized");
  try {
    decodedPayload = jwt.verify(token, secretKey);
  } catch (e) {
    const err = e as JsonWebTokenError;
    if (err.name === "JsonWebTokenError") {
      throw new Error("Invalid Token");
    }

    if (err.name === "TokenExpiredError") {
      throw new Error("expired token");
    }

    throw new Error("Unauthorized");
  }
  return decodedPayload;
};

export function generateAuthToken(payload: {
  _id: Types.ObjectId;
  email: string;
  name: string;
  role: UserRolesEnum;
}): string {
  return jwt.sign(payload, secretKey, {
    expiresIn: "1h",
  });
}
