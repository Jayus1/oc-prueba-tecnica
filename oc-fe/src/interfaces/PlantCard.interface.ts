export interface PlantCardType {
    id: string;
    nombre: string;
    especie: string;
    ubicacion: string;
    onDelete?: () => void;
};