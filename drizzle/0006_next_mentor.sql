CREATE TABLE IF NOT EXISTS "passkey" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"name" varchar,
	"public_key" varchar,
	"user_id" varchar,
	"webauthn_user_id" varchar,
	"counter" integer,
	"device_type" text,
	"back_up" boolean,
	"transports" text,
	"created_at" date,
	CONSTRAINT "passkey_id_unique" UNIQUE("id")
);
