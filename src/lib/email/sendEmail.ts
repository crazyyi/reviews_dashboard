import { URL } from "url";
import { createTransport } from "nodemailer"
import type { User } from "better-auth/types";
import '../envConfig'
import { useAWSSes } from "./awsSendEmail";

const to = process.env.TEST_EMAIL || "";

const emailService = {
  type: "aws"
}

export async function sendEmail(user: User, url: URL) {
  console.log("Sending verification email to", user.email);

  if (emailService["type"] === "gmail") {
    const transporter = createTransport({
      service: "gmail",
      host: process.env.GOOGLE_SMTP_HOST,
      port: 587,
      secure: true,
      auth: {
        user: process.env.GOOGLE_EMAIL_USER,
        pass: process.env.GOOGLE_EMAIL_PASSWORD,
      }
    })

    const mailOptions = {
      from: process.env.GOOGLE_EMAIL_USER,
      to: to || user.email,
      subject: `Email Verification for ${user.name}`,
      html: `<a href="${url.toString()}">Verify your email address</a>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error: ", error);
      } else {
        console.log(`Email sent, ${info.response}, from ${user.email}`);
      }
    });
  }

  if (emailService["type"] === "aws") {
    useAWSSes({
      user: user,
      to: to,
      subject: `Email Verification for ${user.name}`,
      htmlText: `<a href="${url.toString()}">Verify your email address</a>`,
    })
  }

}