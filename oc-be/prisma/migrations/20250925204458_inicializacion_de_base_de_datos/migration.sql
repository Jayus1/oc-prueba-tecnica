-- CreateTable
CREATE TABLE "public"."plantas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "ubicacion" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plantas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cuidados" (
    "id" SERIAL NOT NULL,
    "id_planta" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3),
    "notas" TEXT,

    CONSTRAINT "cuidados_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."cuidados" ADD CONSTRAINT "cuidados_id_planta_fkey" FOREIGN KEY ("id_planta") REFERENCES "public"."plantas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
