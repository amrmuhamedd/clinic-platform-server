import { prop, getModelForClass } from "@typegoose/typegoose";
import { UserRolesEnum } from "../enums/userRole.enum";

class User {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true, enum: UserRolesEnum })
  public role!: UserRolesEnum;
}

const UserModel = getModelForClass(User);

export { User, UserModel };
