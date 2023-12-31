import { transport } from "../configs/nodeMailer";

type SendEmailDto = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export const SendEmail = (data: SendEmailDto) => {
  return transport.sendMail({
    from: process.env.FROM_EMAIL,
    to: data.to,
    subject: data.subject,
    html: data.html,
    text: data.text,
  });
};
