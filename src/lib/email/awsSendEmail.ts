import type { EmailInfo } from "@/types";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export function useAWSSes({
  user,
  to,
  subject,
  htmlText,
}: EmailInfo) {
  const transporter = createTransport({
    host: process.env.AWS_SMTP_HOST,
    port: 465,    // 587 if secure: false
    secure: true,
    auth: {
      user: process.env.AWS_SMTP_USERNAME,
      pass: process.env.AWS_SMTP_PASSWORD,
    }
  })

  const mailOptions = {
    from: process.env.AWS_EMAIL_USER,
    to: to || user.email,
    subject: subject,
    html: htmlText
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error: ", error);
      return NextResponse.json({ message: `Error found sending email: ${error}`, success: false }, { status: 400 })
    } else {
      console.log(`An email was sent to ${user.email}, [INFO]: ${info.response}`);
    }
  });
}