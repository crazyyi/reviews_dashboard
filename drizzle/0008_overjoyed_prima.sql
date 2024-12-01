ALTER TABLE "passkey" RENAME COLUMN "public_key" TO "publicKey";--> statement-breakpoint
ALTER TABLE "passkey" RENAME COLUMN "webauthn_user_id" TO "WebAuthnUserId";--> statement-breakpoint
ALTER TABLE "passkey" RENAME COLUMN "device_type" TO "deviceType";--> statement-breakpoint
ALTER TABLE "passkey" RENAME COLUMN "back_up" TO "backedUp";--> statement-breakpoint
ALTER TABLE "passkey" RENAME COLUMN "created_at" TO "createdAt";