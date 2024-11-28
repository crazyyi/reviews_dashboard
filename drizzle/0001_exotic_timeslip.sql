CREATE TABLE IF NOT EXISTS "feedbacks" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "feedbacks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"project_id" integer,
	"feedback" varchar(300),
	"user_name" text,
	"user_email" text,
	"message" text
);
