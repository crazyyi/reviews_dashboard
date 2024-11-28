CREATE TABLE IF NOT EXISTS "projects" (
	"id" varchar(32) PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"url" text,
	"description" varchar(200) NOT NULL,
	"user_id" varchar
);
