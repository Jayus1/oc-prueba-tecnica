export interface PlantCardType {
    id: number;
    nombre: string;
    especie: string;
    ubicacion: string;
    onDelete?: () => void;

};