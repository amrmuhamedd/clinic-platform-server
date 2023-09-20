import { Request, Response } from "express";
import { MedicalRecordModel } from "../Models/MedicalRecord";

export const createMedicalRecord = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?._id as number;
    const patientId = req.query.patientId;
    const { notes, message, diagnosis, session_date } = req.body;

    const medicalRecord = new MedicalRecordModel({
      notes,
      message,
      diagnosis,
      session_date,
      doctorId,
      patientId,
    });

    await medicalRecord.save();
    await medicalRecord.populate([
      {
        path: "doctorId",
        select: "_id name",
      },
      { path: "patientId", select: "_id name" },
    ]);
    res.status(201).json(medicalRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const listMedicalRecords = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as number;
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;

    const skip = (page - 1) * perPage;
    const limit = perPage;

    const medicalRecords = await MedicalRecordModel.find({
      $or: [{ doctorId: userId }, { patientId: userId }],
    })
      .populate([
        {
          path: "doctorId",
          select: "_id name",
        },
        { path: "patientId", select: "_id name" },
      ])
      .skip(skip)
      .limit(limit);

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
