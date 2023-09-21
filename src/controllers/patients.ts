import { Request, Response } from "express";
import { UserModel } from "../Models/user";

export const listPatients = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;

    const skip = (page - 1) * perPage;
    const limit = perPage;

    const patients = await UserModel.find({
      role: "patient",
    })
      .select("-password -role")
      .skip(skip)
      .limit(limit);

    const totalCount = await UserModel.countDocuments();

    res.status(200).json({
      data: patients,
      page,
      perPage,
      totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
