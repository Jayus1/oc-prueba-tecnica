import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min, IsPositive, IsOptional, IsString } from "class-validator";

export class PaginationParamsDto {
    @ApiProperty({
        name: "pagina",
        example: 1, description: 'Número de página (empieza en 1)'
    })
    @Type(() => Number)
    @IsInt({ message: 'La página debe ser un número entero' })
    @Min(1, { message: 'La página debe ser mayor o igual a 1' })
    page: number;

    @ApiProperty({
        name: "limite",
        example: 10, description: 'Cantidad de items por página'
    })
    @Type(() => Number)
    @IsInt({ message: 'El límite debe ser un número entero' })
    @IsPositive({ message: 'El límite debe ser mayor que 0' })
    limit: number;

    @ApiPropertyOptional({
        name: "buscar",
        description: 'Palabra a buscar',
    })
    @IsOptional()
    @IsString({ message: 'El campo buscar debe ser un texto' })
    search?: string;
}