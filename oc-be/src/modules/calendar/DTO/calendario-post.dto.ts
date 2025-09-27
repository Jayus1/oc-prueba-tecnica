import { ApiProperty } from "@nestjs/swagger";
import { TipoCuidado } from "src/utils/tipoCuidado.utils";

export class CalendarSuggestionDto {
    @ApiProperty()
    idPlanta: number;

    @ApiProperty({ type: String, format: 'date' })
    fechaInicio: string; // YYYY-MM-DD

    @ApiProperty({ type: String, format: 'date' })
    fechaFin: string; // YYYY-MM-DD

    @ApiProperty({ enum: TipoCuidado })
    tipo: TipoCuidado;

    @ApiProperty({ required: false })
    frecuenciaDias?: number; // ej: "riego cada 3 días"
}
