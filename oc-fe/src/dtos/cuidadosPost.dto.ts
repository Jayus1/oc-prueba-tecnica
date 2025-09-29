export interface CuidadosPostDto {
    idPlanta: string;
    tipo: string;
    fechaInicio: Date;
    fechaFin: Date;
    notas?: string;
}