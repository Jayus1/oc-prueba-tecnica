import { TipoCuidado } from "../shared/tipoCuidado.enum";
import type { CuidadosType } from "../types/cuidados.type";


export const validateFertilizacionAndPoda = (
    tipo: string,
    fechaInicio: Date,
    idPlanta: string,
    existingCuidados: CuidadosType[]
): boolean => {
    if (tipo === TipoCuidado.LUZ) return true;
    if (tipo === TipoCuidado.RIEGO) return true;

    const fecha = new Date(fechaInicio);
    const startOfDay = new Date(fecha);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(fecha);
    endOfDay.setHours(23, 59, 59, 999);

    const tipoContrario = tipo === TipoCuidado.PODA ? TipoCuidado.FERTILIZACION : TipoCuidado.PODA;

    const conflicto = existingCuidados.some(cuidado => {
        if (cuidado.idPlanta !== idPlanta) return false;
        if (cuidado.tipo !== tipoContrario) return false;

        const fechaCuidado = new Date(cuidado.fechaFin ?? cuidado.fechaInicio);
        return fechaCuidado >= startOfDay && fechaCuidado <= endOfDay;
    });

    return !conflicto;
};