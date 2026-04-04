CREATE TABLE "discography" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"year" integer NOT NULL,
	"label" text,
	"cover_image" text,
	"spotify_url" text,
	"apple_music_url" text,
	"amazon_url" text
);
--> statement-breakpoint
CREATE TABLE "discography_review_translations" (
	"id" serial PRIMARY KEY NOT NULL,
	"review_id" integer NOT NULL,
	"language_code" varchar(2) NOT NULL,
	"reviewer_name" text NOT NULL,
	"review_text" text NOT NULL,
	CONSTRAINT "discography_review_translations_review_id_language_code_unique" UNIQUE("review_id","language_code")
);
--> statement-breakpoint
CREATE TABLE "discography_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"discography_id" integer NOT NULL,
	"reviewer_nif" text NOT NULL,
	"rating" integer,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "discography_reviews_discography_id_reviewer_nif_unique" UNIQUE("discography_id","reviewer_nif")
);
--> statement-breakpoint
CREATE TABLE "event_translations" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"language_code" varchar(2) NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "event_translations_event_id_language_code_unique" UNIQUE("event_id","language_code")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"time" text NOT NULL,
	"venue" text NOT NULL,
	"is_past" boolean DEFAULT false,
	"booking_link" text,
	"program_link" text
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"code" varchar(2) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"is_default" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "repertoire" (
	"id" serial PRIMARY KEY NOT NULL,
	"composer" text NOT NULL,
	"category_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "repertoire_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "repertoire_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "repertoire_category_translations" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"language_code" varchar(2) NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "repertoire_category_translations_category_id_language_code_unique" UNIQUE("category_id","language_code")
);
--> statement-breakpoint
CREATE TABLE "repertoire_translations" (
	"id" serial PRIMARY KEY NOT NULL,
	"repertoire_id" integer NOT NULL,
	"language_code" varchar(2) NOT NULL,
	"title" text NOT NULL,
	CONSTRAINT "repertoire_translations_repertoire_id_language_code_unique" UNIQUE("repertoire_id","language_code")
);
--> statement-breakpoint
CREATE TABLE "site_content" (
	"key" text PRIMARY KEY NOT NULL,
	"value_pt" text NOT NULL,
	"value_en" text NOT NULL,
	"type" text DEFAULT 'text' NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"is_admin" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "discography_review_translations" ADD CONSTRAINT "discography_review_translations_review_id_discography_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."discography_reviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discography_review_translations" ADD CONSTRAINT "discography_review_translations_language_code_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "public"."languages"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discography_reviews" ADD CONSTRAINT "discography_reviews_discography_id_discography_id_fk" FOREIGN KEY ("discography_id") REFERENCES "public"."discography"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_translations" ADD CONSTRAINT "event_translations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_translations" ADD CONSTRAINT "event_translations_language_code_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "public"."languages"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repertoire" ADD CONSTRAINT "repertoire_category_id_repertoire_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."repertoire_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repertoire_category_translations" ADD CONSTRAINT "repertoire_category_translations_category_id_repertoire_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."repertoire_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repertoire_category_translations" ADD CONSTRAINT "repertoire_category_translations_language_code_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "public"."languages"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repertoire_translations" ADD CONSTRAINT "repertoire_translations_repertoire_id_repertoire_id_fk" FOREIGN KEY ("repertoire_id") REFERENCES "public"."repertoire"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repertoire_translations" ADD CONSTRAINT "repertoire_translations_language_code_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "public"."languages"("code") ON DELETE no action ON UPDATE no action;