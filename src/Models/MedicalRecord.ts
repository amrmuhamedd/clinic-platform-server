import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./user";

class MedicalRecord {
  @prop({ required: true })
  public session_date!: string;

  @prop({ required: true })
  public diagnosis!: string;

  @prop({ required: false })
  public message!: string;

  @prop({ required: false })
  public notes!: string;

  @prop({ ref: User })
  doctorId!: Ref<User>;
}

const MedicalRecordModel = getModelForClass(MedicalRecord);

export { MedicalRecord, MedicalRecordModel };
