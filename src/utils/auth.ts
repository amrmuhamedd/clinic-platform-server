import jwt from "jsonwebtoken";
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
