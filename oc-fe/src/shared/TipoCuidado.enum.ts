export const TipoCuidado = {
    RIEGO: "riego",
    FERTILIZACION: "fertilizacion",
    PODA: "poda",
    LUZ: "luz",
} as const;

export type TipoCuidado = (typeof TipoCuidado)[keyof typeof TipoCuidado];
