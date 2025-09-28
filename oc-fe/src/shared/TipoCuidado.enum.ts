export const TipoCuidado = {
    RIEGO: "RIEGO",
    FERTILIZACION: "FERTILIZACION",
    PODA: "PODA",
    LUZ: "LUZ",
} as const;

export type TipoCuidado = (typeof TipoCuidado)[keyof typeof TipoCuidado];
