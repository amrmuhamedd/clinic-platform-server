import { NextFunction, Response } from "express";
import { validationResult, query } from "express-validator";
const { body } = require("express-validator");

export const validateUpdateMedicalRecord = [
  query("recordId").notEmpty(),
  body("patientId").isString().withMessage("you must be string"),
  body("notes").isString().withMessage("you must be string"),
  body("message").isString().withMessage("message must be astring"),
  body("diagnosis").withMessage("you must type diagnosis"),
  body("session_date").withMessage("you must type session date"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
