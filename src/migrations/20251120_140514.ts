import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_documents_files_type" AS ENUM('project', 'allow');
  CREATE TABLE "floors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rooms" numeric NOT NULL,
  	"square" numeric NOT NULL,
  	"floor" numeric NOT NULL,
  	"room_height" numeric NOT NULL,
  	"view" varchar DEFAULT 'На море' NOT NULL,
  	"poster_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "floors_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "plans_plans_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"plan_id" integer NOT NULL
  );
  
  CREATE TABLE "gallery_gallery_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "documents_files" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"type" "enum_documents_files_type" DEFAULT 'project',
  	"file_id" integer NOT NULL
  );
  
  ALTER TABLE "plans_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "images_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "documents_documents" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "plans_texts" CASCADE;
  DROP TABLE "images_images" CASCADE;
  DROP TABLE "images" CASCADE;
  DROP TABLE "documents_documents" CASCADE;
  ALTER TABLE "plans" DROP CONSTRAINT "plans_poster_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_plans_fk";
  
  DROP INDEX "plans_poster_idx";
  DROP INDEX "plans_updated_at_idx";
  DROP INDEX "plans_created_at_idx";
  DROP INDEX "payload_locked_documents_rels_plans_id_idx";
  ALTER TABLE "plans" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "plans" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "plans" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "plans" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "media" ALTER COLUMN "alt" DROP NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "floors_id" integer;
  ALTER TABLE "floors" ADD CONSTRAINT "floors_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "floors_texts" ADD CONSTRAINT "floors_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."floors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans_plans_slider" ADD CONSTRAINT "plans_plans_slider_plan_id_floors_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."floors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "plans_plans_slider" ADD CONSTRAINT "plans_plans_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_gallery_slider" ADD CONSTRAINT "gallery_gallery_slider_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_gallery_slider" ADD CONSTRAINT "gallery_gallery_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents_files" ADD CONSTRAINT "documents_files_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents_files" ADD CONSTRAINT "documents_files_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "floors_poster_idx" ON "floors" USING btree ("poster_id");
  CREATE INDEX "floors_updated_at_idx" ON "floors" USING btree ("updated_at");
  CREATE INDEX "floors_created_at_idx" ON "floors" USING btree ("created_at");
  CREATE INDEX "floors_texts_order_parent" ON "floors_texts" USING btree ("order","parent_id");
  CREATE INDEX "plans_plans_slider_order_idx" ON "plans_plans_slider" USING btree ("_order");
  CREATE INDEX "plans_plans_slider_parent_id_idx" ON "plans_plans_slider" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "plans_plans_slider_plan_idx" ON "plans_plans_slider" USING btree ("plan_id");
  CREATE INDEX "gallery_gallery_slider_order_idx" ON "gallery_gallery_slider" USING btree ("_order");
  CREATE INDEX "gallery_gallery_slider_parent_id_idx" ON "gallery_gallery_slider" USING btree ("_parent_id");
  CREATE INDEX "gallery_gallery_slider_image_idx" ON "gallery_gallery_slider" USING btree ("image_id");
  CREATE INDEX "documents_files_order_idx" ON "documents_files" USING btree ("_order");
  CREATE INDEX "documents_files_parent_id_idx" ON "documents_files" USING btree ("_parent_id");
  CREATE INDEX "documents_files_file_idx" ON "documents_files" USING btree ("file_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_floors_fk" FOREIGN KEY ("floors_id") REFERENCES "public"."floors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_floors_id_idx" ON "payload_locked_documents_rels" USING btree ("floors_id");
  ALTER TABLE "plans" DROP COLUMN "name";
  ALTER TABLE "plans" DROP COLUMN "rooms";
  ALTER TABLE "plans" DROP COLUMN "square";
  ALTER TABLE "plans" DROP COLUMN "floor";
  ALTER TABLE "plans" DROP COLUMN "room_height";
  ALTER TABLE "plans" DROP COLUMN "view";
  ALTER TABLE "plans" DROP COLUMN "poster_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "plans_id";
  DROP TYPE "public"."enum_documents_documents_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_documents_documents_type" AS ENUM('project', 'allow');
  CREATE TABLE "plans_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "images_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "images" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "documents_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"type" "enum_documents_documents_type" DEFAULT 'project',
  	"file_id" integer NOT NULL
  );
  
  ALTER TABLE "floors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "floors_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "plans_plans_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_gallery_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "documents_files" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "floors" CASCADE;
  DROP TABLE "floors_texts" CASCADE;
  DROP TABLE "plans_plans_slider" CASCADE;
  DROP TABLE "gallery_gallery_slider" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "documents_files" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_floors_fk";
  
  DROP INDEX "payload_locked_documents_rels_floors_id_idx";
  ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "plans" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "plans" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "plans" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "plans" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "plans_id" integer;
  ALTER TABLE "plans" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "plans" ADD COLUMN "rooms" numeric NOT NULL;
  ALTER TABLE "plans" ADD COLUMN "square" numeric NOT NULL;
  ALTER TABLE "plans" ADD COLUMN "floor" numeric NOT NULL;
  ALTER TABLE "plans" ADD COLUMN "room_height" numeric NOT NULL;
  ALTER TABLE "plans" ADD COLUMN "view" varchar DEFAULT 'На море' NOT NULL;
  ALTER TABLE "plans" ADD COLUMN "poster_id" integer NOT NULL;
  ALTER TABLE "plans_texts" ADD CONSTRAINT "plans_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "images_images" ADD CONSTRAINT "images_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "images_images" ADD CONSTRAINT "images_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents_documents" ADD CONSTRAINT "documents_documents_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents_documents" ADD CONSTRAINT "documents_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "plans_texts_order_parent" ON "plans_texts" USING btree ("order","parent_id");
  CREATE INDEX "images_images_order_idx" ON "images_images" USING btree ("_order");
  CREATE INDEX "images_images_parent_id_idx" ON "images_images" USING btree ("_parent_id");
  CREATE INDEX "images_images_image_idx" ON "images_images" USING btree ("image_id");
  CREATE INDEX "documents_documents_order_idx" ON "documents_documents" USING btree ("_order");
  CREATE INDEX "documents_documents_parent_id_idx" ON "documents_documents" USING btree ("_parent_id");
  CREATE INDEX "documents_documents_file_idx" ON "documents_documents" USING btree ("file_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_plans_fk" FOREIGN KEY ("plans_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans" ADD CONSTRAINT "plans_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_plans_id_idx" ON "payload_locked_documents_rels" USING btree ("plans_id");
  CREATE INDEX "plans_poster_idx" ON "plans" USING btree ("poster_id");
  CREATE INDEX "plans_updated_at_idx" ON "plans" USING btree ("updated_at");
  CREATE INDEX "plans_created_at_idx" ON "plans" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "floors_id";
  DROP TYPE "public"."enum_documents_files_type";`)
}
