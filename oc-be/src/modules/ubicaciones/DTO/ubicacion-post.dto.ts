import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, MaxLength, MinLength } from "class-validator";

export class UbicacionPostDto {
    @ApiProperty({ description: "Nombre de la ubicación" })
    @IsString()
    @MinLength(2, { message: "El nombre debe tener al menos 2 caracteres" })
    @MaxLength(100, { message: "El nombre no puede tener más de 100 caracteres" })
    nombre: string;

    @ApiProperty({ required: false, description: "Descripción de la ubicación" })
    @IsOptional()
    @IsString()
    @MaxLength(500, { message: "La descripción no puede tener más de 500 caracteres" })
    descripcion?: string;
}