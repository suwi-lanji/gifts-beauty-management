CREATE TABLE IF NOT EXISTS "gifts_beauty_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "gifts_beauty_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gifts_beauty_expenses" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"category" varchar(255) NOT NULL,
	"amount" real NOT NULL,
	"date" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gifts_beauty_orders" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"amount" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gifts_beauty_products" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"price" real,
	"is_available" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gifts_beauty_products_to_orders" (
	"product_id" varchar(255) NOT NULL,
	"order_id" varchar(255) NOT NULL,
	CONSTRAINT "gifts_beauty_products_to_orders_product_id_order_id_pk" PRIMARY KEY("product_id","order_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gifts_beauty_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gifts_beauty_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gifts_beauty_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "gifts_beauty_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gifts_beauty_account" ADD CONSTRAINT "gifts_beauty_account_user_id_gifts_beauty_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."gifts_beauty_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gifts_beauty_orders" ADD CONSTRAINT "gifts_beauty_orders_user_id_gifts_beauty_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."gifts_beauty_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gifts_beauty_products" ADD CONSTRAINT "gifts_beauty_products_user_id_gifts_beauty_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."gifts_beauty_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gifts_beauty_products_to_orders" ADD CONSTRAINT "gifts_beauty_products_to_orders_product_id_gifts_beauty_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."gifts_beauty_products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gifts_beauty_products_to_orders" ADD CONSTRAINT "gifts_beauty_products_to_orders_order_id_gifts_beauty_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."gifts_beauty_orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gifts_beauty_session" ADD CONSTRAINT "gifts_beauty_session_user_id_gifts_beauty_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."gifts_beauty_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "gifts_beauty_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "gifts_beauty_session" USING btree ("user_id");