export interface CuidadosPostDto {
    idPlanta: number;
    tipo: string;
    fechaInicio: Date;
    fechaFin: Date;
    notas?: string;
}