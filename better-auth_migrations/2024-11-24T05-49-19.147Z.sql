alter table "account" add column "accessTokenExpiresAt" timestamp;

alter table "account" add column "refreshTokenExpiresAt" timestamp;

alter table "account" add column "scope" text