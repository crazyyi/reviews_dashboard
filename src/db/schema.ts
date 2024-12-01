import { relations } from "drizzle-orm";
import { boolean, date, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

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

export const passkey = pgTable("passkey", {
  id: varchar("id", { length: 32 }).primaryKey().unique(),
  name: varchar("name"),
  publicKey: varchar("publicKey"),
  userId: varchar("userId"),	// string	FK	The id of the user
  webauthnUserID: varchar("webauthnUserID"), // The user id for WebAuthn
  counter: integer("counter"), // The counter of the passkey
  deviceType: text("deviceType"),	// The type of device used to register the passkey
  backedUp: boolean("backedUp"),	// Whether the passkey is backed up
  transports: text("transports"),	 // The transports used to register the passkey
  createdAt: date("createdAt")
})

const BetterAuthUsers = pgTable("user", {
  id: varchar("id").primaryKey().notNull(),
});

export const passkeysRelations = relations(passkey, ({ one }) => ({
  user: one(BetterAuthUsers, {
    fields: [passkey.userId],
    references: [BetterAuthUsers.id]
  })
}))


