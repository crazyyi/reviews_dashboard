CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"subscribed" boolean
);
--> statement-breakpoint
ALTER TABLE "feedbacks" ALTER COLUMN "project_id" SET DATA TYPE varchar;--> statement-breakpoint