import { ApiProperty } from "@nestjs/swagger"
import { TipoCuidado } from "@prisma/client";
import { IsInt, IsEnum, IsDateString, IsOptional, IsString } from "class-validator";


export class CuidadosPostDto {

    @ApiProperty({ description: "Id de la planta" })
    @IsString()
    idPlanta: string

    @ApiProperty({ description: "Tipo de cuidado" })
    @IsEnum(TipoCuidado)
    tipo: TipoCuidado

    @ApiProperty({ description: "Fecha de inicio del cuidado" })
    @IsDateString()
    fechaInicio: Date

    @ApiProperty({ description: "Fecha de finalizacion del cuidado" })
    @IsOptional()
    @IsDateString()
    fechaFin?: Date

    @ApiProperty({ required: false, description: "Notas del cuidado" })
    @IsOptional()
    @IsString()
    notas?: string
}   