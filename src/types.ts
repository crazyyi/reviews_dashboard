import type { InferSelectModel } from "drizzle-orm";
import { projects } from "./db/schema";
import Stripe from "stripe";
import type { User } from "better-auth/types";

export type Project = InferSelectModel<typeof projects>

export type SubscriptionPlanType = {
  id: string,
  name: string,
  description: string,
  price: number | null,
  interval: Stripe.Price.Recurring.Interval,
  price_id: string,
}

export enum TableName {
  PROJECT = "projects",
  SUBSCRIPTION = "subscriptions"
}

export type EmailInfo = {
  user: User,
  to: string,
  subject: string,
  htmlText: string
}