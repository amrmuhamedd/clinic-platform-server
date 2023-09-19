import jwt from "jsonwebtoken";
import { UserRolesEnum } from "../enums/userRole.enum";
import { Types } from "mongoose";

const secretKey = process.env.SECRET_KEY as string;

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
