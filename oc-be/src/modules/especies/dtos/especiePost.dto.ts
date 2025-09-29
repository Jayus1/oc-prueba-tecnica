import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, MaxLength, MinLength } from "class-validator";

export class EspeciePostDto {
    @ApiProperty({ description: "Nombre de la especie" })
    @IsString()
    @MinLength(2, { message: "El nombre debe tener al menos 2 caracteres" })
    @MaxLength(100, { message: "El nombre no puede tener más de 100 caracteres" })
    nombre: string;

    @ApiProperty({ required: false, description: "Nombre científico de la especie" })
    @IsOptional()
    @IsString()
    @MaxLength(150, { message: "El nombre científico no puede tener más de 150 caracteres" })
    nombreCientifico?: string;

    @ApiProperty({ required: false, description: "Descripción de la especie" })
    @IsOptional()
    @IsString()
    @MaxLength(1000, { message: "La descripción no puede tener más de 1000 caracteres" })
    descripcion?: string;
}