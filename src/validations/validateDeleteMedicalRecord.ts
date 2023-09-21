import { NextFunction, Response } from "express";
import { validationResult, query } from "express-validator";
const { body } = require("express-validator");

export const validateDeleteMedicalRecord = [
  query("recordId").notEmpty(),
  body(""),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
