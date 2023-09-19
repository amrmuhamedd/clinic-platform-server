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

export const listMedicalRecords = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default to page 1
    const perPage = parseInt(req.query.perPage as string) || 10; // Default to 10 records per page

    // Calculate skip and limit values for pagination
    const skip = (page - 1) * perPage;
    const limit = perPage;

    // Query the database for medical records with pagination
    const medicalRecords = await MedicalRecordModel.find()
      .populate({ path: "doctorId", select: "_id name" })
      .skip(skip)
      .limit(limit);

    // Count the total number of records (useful for pagination)
    const totalCount = await MedicalRecordModel.countDocuments();

    res.status(200).json({
      data: medicalRecords,
      page,
      perPage,
      totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
