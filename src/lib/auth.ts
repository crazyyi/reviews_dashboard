import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { sendEmail } from "./email/sendEmail";
import './envConfig.ts'
import { sendResetPasswordEmail } from "./email/sendResetPassword";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL!
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    async sendResetPassword({ user, url }) {
      await sendResetPasswordEmail(user, new URL(url))
    },
  },
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      await sendEmail(user, new URL(url))
    },
    sendOnSignUp: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"]
    }
  },
})