ALTER TABLE "gifts_beauty_orders" DROP CONSTRAINT "gifts_beauty_orders_user_id_gifts_beauty_user_id_fk";
--> statement-breakpoint
ALTER TABLE "gifts_beauty_products" DROP CONSTRAINT "gifts_beauty_products_user_id_gifts_beauty_user_id_fk";
--> statement-breakpoint
ALTER TABLE "gifts_beauty_products" ADD COLUMN "image" varchar(255);--> statement-breakpoint
ALTER TABLE "gifts_beauty_orders" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "gifts_beauty_products" DROP COLUMN IF EXISTS "user_id";