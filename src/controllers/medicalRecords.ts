import { Request, Response } from "express";
import { MedicalRecordModel } from "../Models/MedicalRecord";

export const createMedicalRecord = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?._id as number;
    const { notes, message, diagnosis, session_date } = req.body;

    const medicalRecord = new MedicalRecordModel({
      notes,
      message,
      diagnosis,
      session_date,
      doctorId,
    });

    await medicalRecord.save();
    await medicalRecord.populate({
      path: "doctorId",
      select: "_id name",
    });
    res.status(201).json(medicalRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
