import { TipoCuidado } from "@prisma/client";

export function mapToTipoCuidado(tipo: string): TipoCuidado {
    const mapping: Record<string, TipoCuidado> = {
        riego: TipoCuidado.RIEGO,
        fertilizacion: TipoCuidado.FERTILIZACION,
        poda: TipoCuidado.PODA,
        luz: TipoCuidado.LUZ,
    };

    const tipoEnum = mapping[tipo.toLowerCase()];

    if (!tipoEnum) {
        throw new Error(`Tipo de cuidado inválido: ${tipo}`);
    }

    return tipoEnum;
}