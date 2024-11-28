import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: varchar("id", { length: 32 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  url: text("url"),
  description: varchar("description", { length: 200 }).notNull(),
  userId: varchar("user_id")
});

export const projectsRelations = relations(projects, ({ many }) => ({
  feedbacks: many(feedbacks)
}))

export const feedbacks = pgTable("feedbacks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar("project_id"),
  feedback: varchar("feedback", { length: 300 }),
  userName: text("user_name"),
  userEmail: text("user_email"),
  message: text("message"),
  rating: integer("rating")
});

export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  project: one(projects, {
    fields: [feedbacks.projectId],
    references: [projects.id]
  })
}))

export const subscriptions = pgTable("subscriptions", {
  id: varchar("id", { length: 32 }).primaryKey(),
  userId: varchar("user_id"),
  stripeCustomerId: text("stripe_customer_id"),
  stripePriceId: text("stripe_price_id"),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),
  subscribed: boolean("subscribed")
})


