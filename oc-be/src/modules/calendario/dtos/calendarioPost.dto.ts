import { ApiProperty } from "@nestjs/swagger";
import { TipoCuidado } from "@prisma/client";
import { IsInt, IsString, IsEnum, IsOptional, IsDateString } from "class-validator";

export class CalendarSuggestionDto {
    @ApiProperty({ description: "Id de la planta" })
    @IsString()
    idPlanta: string;

    @ApiProperty({ type: String, format: 'date', description: "Fecha de inicio del cuidado" })
    @IsDateString()
    fechaInicio: string;

    @ApiProperty({ type: String, format: 'date', description: "Fecha de finalizacion del cuidado" })
    @IsDateString()
    fechaFin: string;

    @ApiProperty({ enum: TipoCuidado, description: "Tipo de cuidado" })
    @IsEnum(TipoCuidado)
    tipo: TipoCuidado;

    @ApiProperty({ required: false, description: "Fecuencia de dias" })
    @IsOptional()
    @IsInt()
    frecuenciaDias?: number;
}
