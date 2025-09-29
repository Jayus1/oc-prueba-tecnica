-- AlterTable
ALTER TABLE "public"."especies" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."ubicaciones" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
