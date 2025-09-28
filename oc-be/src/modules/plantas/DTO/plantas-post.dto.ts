import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class PlantasPostDto {
    @ApiProperty({ description: "Nombre de la planta" })
    @IsString()
    nombre: string

    @ApiProperty({ description: "Id de la especie" })
    @IsString()
    especie: string

    @ApiProperty({ required: false, description: "Ubicacion de la planta" })
    @IsOptional()
    @IsString()
    ubicacion?: string

}

