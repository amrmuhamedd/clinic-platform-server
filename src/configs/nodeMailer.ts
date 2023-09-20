import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

export const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SEND_GRID_API_KEY as string,
  })
);
