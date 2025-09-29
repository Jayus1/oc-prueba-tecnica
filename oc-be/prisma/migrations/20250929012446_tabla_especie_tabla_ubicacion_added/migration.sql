/*
  Warnings:

  - You are about to drop the column `especie` on the `plantas` table. All the data in the column will be lost.
  - You are about to drop the column `ubicacion` on the `plantas` table. All the data in the column will be lost.
  - Added the required column `idEspecie` to the `plantas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."plantas" DROP COLUMN "especie",
DROP COLUMN "ubicacion",
ADD COLUMN     "idEspecie" INTEGER NOT NULL,
ADD COLUMN     "idUbicacion" INTEGER;

-- CreateTable
CREATE TABLE "public"."especies" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nombreCientifico" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "especies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ubicaciones" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ubicaciones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."plantas" ADD CONSTRAINT "plantas_idEspecie_fkey" FOREIGN KEY ("idEspecie") REFERENCES "public"."especies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plantas" ADD CONSTRAINT "plantas_idUbicacion_fkey" FOREIGN KEY ("idUbicacion") REFERENCES "public"."ubicaciones"("id") ON DELETE SET NULL ON UPDATE CASCADE;
