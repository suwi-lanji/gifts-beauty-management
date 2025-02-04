CREATE TABLE IF NOT EXISTS "gifts_beauty_credits" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"amount" real NOT NULL,
	"date" date DEFAULT now(),
	"status" varchar(255) NOT NULL,
	"description" text
);
