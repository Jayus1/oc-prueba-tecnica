/*
  Warnings:

  - Changed the type of `tipo` on the `cuidados` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."TipoCuidado" AS ENUM ('RIEGO', 'FERTILIZACION', 'PODA', 'LUZ');

-- AlterTable
ALTER TABLE "public"."cuidados" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "public"."TipoCuidado" NOT NULL;
