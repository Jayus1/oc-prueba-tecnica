import { TipoCuidado } from "../shared/TipoCuidado.enum";
import type { CuidadosType } from "../types/Cuidados.type";

export const validateRiegoTime = (
    tipo: string,
    fechaInicio: Date,
    idPlanta: number,
    existingCuidados: CuidadosType[]
): boolean => {

    if (tipo !== TipoCuidado.RIEGO) return true;

    const fechaRiego = new Date(fechaInicio);
    const fecha24hAntes = new Date(fechaRiego.getTime() - 24 * 60 * 60 * 1000);

    const fertilizacionConflicto = existingCuidados.some(cuidado => {
        if (cuidado.idPlanta !== idPlanta) return false;
        if (cuidado.tipo !== TipoCuidado.FERTILIZACION) return false;

        const fechaCuidado = new Date(cuidado.fechaFin ?? cuidado.fechaInicio);

        return fechaCuidado >= fecha24hAntes && fechaCuidado <= fechaRiego;
    });


    return !fertilizacionConflicto;
};