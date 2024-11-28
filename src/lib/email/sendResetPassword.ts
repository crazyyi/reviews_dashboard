import ReactDOMServer from "react-dom/server.browser"
import { reactResetPasswordEmail } from "./reset-password";
import type { User } from "better-auth/types";
import { useAWSSes } from "./awsSendEmail";

const to = process.env.TEST_EMAIL || "";

export async function sendResetPasswordEmail(user: User, url: URL) {
  useAWSSes({
    user: user,
    to: to || user.email,
    subject: "Reset your password",
    htmlText: ReactDOMServer.renderToString(reactResetPasswordEmail({
      username: user.name,
      resetLink: url.toString()
    }))
  })
}