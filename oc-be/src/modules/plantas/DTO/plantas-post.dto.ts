import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, IsInt, MinLength, MaxLength } from "class-validator"

export class PlantasPostDto {
    @ApiProperty({ description: "Nombre de la planta" })
    @IsString()
    @MinLength(2, { message: "El nombre debe tener al menos 2 caracteres" })
    @MaxLength(100, { message: "El nombre no puede tener más de 100 caracteres" })
    nombre: string

    @ApiProperty({ description: "ID de la especie" })
    @IsInt({ message: "El ID de la especie debe ser un número entero" })
    idEspecie: number

    @ApiProperty({ required: false, description: "ID de la ubicación de la planta" })
    @IsOptional()
    @IsInt({ message: "El ID de la ubicación debe ser un número entero" })
    idUbicacion?: number
}

