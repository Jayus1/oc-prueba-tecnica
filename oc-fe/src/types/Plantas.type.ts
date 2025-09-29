import type { CuidadosType } from "./cuidados.type";

export type PlantasType = {
    id: string,
    nombre: string,
    especie: string,
    ubicacion: string,
    cuidados: CuidadosType[]
};
