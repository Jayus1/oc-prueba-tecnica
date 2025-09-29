/*
  Warnings:

  - The primary key for the `cuidados` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isActive` on the `cuidados` table. All the data in the column will be lost.
  - The primary key for the `especies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `especies` table. All the data in the column will be lost.
  - You are about to drop the column `nombreCientifico` on the `especies` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `especies` table. All the data in the column will be lost.
  - The primary key for the `plantas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idEspecie` on the `plantas` table. All the data in the column will be lost.
  - You are about to drop the column `idUbicacion` on the `plantas` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `plantas` table. All the data in the column will be lost.
  - The primary key for the `ubicaciones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `ubicaciones` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ubicaciones` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `especies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_especie` to the `plantas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ubicaciones` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."cuidados" DROP CONSTRAINT "cuidados_id_planta_fkey";

-- DropForeignKey
ALTER TABLE "public"."plantas" DROP CONSTRAINT "plantas_idEspecie_fkey";

-- DropForeignKey
ALTER TABLE "public"."plantas" DROP CONSTRAINT "plantas_idUbicacion_fkey";

-- AlterTable
ALTER TABLE "public"."cuidados" DROP CONSTRAINT "cuidados_pkey",
DROP COLUMN "isActive",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "id_planta" SET DATA TYPE TEXT,
ADD CONSTRAINT "cuidados_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "cuidados_id_seq";

-- AlterTable
ALTER TABLE "public"."especies" DROP CONSTRAINT "especies_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "nombreCientifico",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nombre_cientifico" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "especies_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "especies_id_seq";

-- AlterTable
ALTER TABLE "public"."plantas" DROP CONSTRAINT "plantas_pkey",
DROP COLUMN "idEspecie",
DROP COLUMN "idUbicacion",
DROP COLUMN "isActive",
ADD COLUMN     "id_especie" TEXT NOT NULL,
ADD COLUMN     "id_ubicacion" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "plantas_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "plantas_id_seq";

-- AlterTable
ALTER TABLE "public"."ubicaciones" DROP CONSTRAINT "ubicaciones_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ubicaciones_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ubicaciones_id_seq";

-- AddForeignKey
ALTER TABLE "public"."plantas" ADD CONSTRAINT "plantas_id_especie_fkey" FOREIGN KEY ("id_especie") REFERENCES "public"."especies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plantas" ADD CONSTRAINT "plantas_id_ubicacion_fkey" FOREIGN KEY ("id_ubicacion") REFERENCES "public"."ubicaciones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cuidados" ADD CONSTRAINT "cuidados_id_planta_fkey" FOREIGN KEY ("id_planta") REFERENCES "public"."plantas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
