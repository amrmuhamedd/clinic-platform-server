import { NextFunction, Response } from "express";
import { validationResult, checkSchema, Schema } from "express-validator";
const { body } = require("express-validator");

export const validateMedicalRecord = [
  body("notes").isString().withMessage("you must be string"),
  body("message").isString().withMessage("message must be astring"),
  body("diagnosis").notEmpty().withMessage("you must type diagnosis"),
  body("session_date").notEmpty().withMessage("you must type session date"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
