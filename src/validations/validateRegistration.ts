import { NextFunction, Response } from "express";
import { validationResult, checkSchema, Schema } from "express-validator";
const { body } = require("express-validator");

let Schema: Schema = {
  role: {
    in: "body",
    matches: {
      options: [/\b(?:patient|doctor)\b/],
      errorMessage: "Invalid role",
    },
  },
};

export const validateRegistration = [
  body("name").notEmpty().withMessage("you must have a name"),
  body("email").isEmail().withMessage("Not a valid e-mail address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be more than 6 charachters"),
  checkSchema(Schema),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
