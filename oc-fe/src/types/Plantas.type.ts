import type { CuidadosType } from "./Cuidados.type";

export type PlantasType = {
    id: number,
    nombre: string,
    especie: string,
    ubicacion: string,
    cuidados: CuidadosType[]
};
