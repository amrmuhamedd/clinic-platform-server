import { Request, Response } from "express";
import { MedicalRecordModel } from "../Models/MedicalRecord";
import { SendEmail } from "../services/sendEmail";
import { UserModel } from "../Models/user";

export const createMedicalRecord = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?._id as number;
    const { notes, message, diagnosis, session_date, patientId } = req.body;

    const medicalRecord = new MedicalRecordModel({
      notes,
      message,
      diagnosis,
      session_date,
      doctorId,
      patientId,
    });

    await medicalRecord.save();
    const patient = await UserModel.findById(patientId);

    const emailData = {
      to: patient?.email as string,
      subject: "Medical Record Created",
      html: `<h3>Dear ${patient?.name}</h3> <p> your medical record at voithy was created please login to see them </p>`,
    };
    await medicalRecord.populate([
      {
        path: "doctorId",
        select: "_id name",
      },
      { path: "patientId", select: "_id name email" },
    ]);

    await SendEmail(emailData);
    res.status(201).json(medicalRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const listMedicalRecords = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const patientId = req.params?.id;
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;

    const skip = (page - 1) * perPage;
    const limit = perPage;

    const medicalRecords = await MedicalRecordModel.find({
      $or: [{ doctorId: userId }, { patientId: userId }],
      patientId,
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

export const updateMedicalRecord = async (req: Request, res: Response) => {
  try {
    const recordId = req.params.id;
    const { notes, message, diagnosis, session_date } = req.body;

    const medicalRecord = await MedicalRecordModel.findById(recordId);

    if (!medicalRecord) {
      return res
        .status(404)
        .json({ success: false, error: "Medical record not found" });
    }

    await MedicalRecordModel.findByIdAndUpdate(recordId, {
      notes,
      message,
      diagnosis,
      session_date,
    });

    const patient = await UserModel.findById(medicalRecord.patientId);

    const emailData = {
      to: patient?.email as string,
      subject: "Medical Record Updated",
      html: `<h3>Dear ${patient?.name}</h3> <p> your medical  record at voithy was Updated  please login to see them </p>`,
    };
    await SendEmail(emailData);

    const updatedMedicalRecord = await MedicalRecordModel.findById(
      recordId
    ).populate({ path: "doctorId", select: "name _id" });

    res.status(200).json(updatedMedicalRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const deleteMedicalRecord = async (req: Request, res: Response) => {
  try {
    const recordId = req.params.id;

    const deletedRecord = await MedicalRecordModel.findByIdAndDelete(recordId);

    if (!deletedRecord) {
      return res
        .status(404)
        .json({ success: false, error: "Medical record not found" });
    }

    res.status(200).json({ success: true, message: "Medical record deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
