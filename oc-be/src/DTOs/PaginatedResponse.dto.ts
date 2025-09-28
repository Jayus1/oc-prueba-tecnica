import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min, IsPositive } from "class-validator";

export class PaginationMetaDto {
    @ApiProperty({ example: 100, description: 'Total de registros encontrados' })
    @IsInt()
    @Min(0)
    total: number;

    @ApiProperty({ example: 1, description: 'Número de página actual' })
    @IsInt()
    @Min(1)
    page: number;

    @ApiProperty({ example: 10, description: 'Cantidad de items por página' })
    @IsInt()
    @IsPositive()
    limit: number;

    @ApiProperty({ example: 10, description: 'Total de páginas' })
    @IsInt()
    @Min(1)
    totalPages: number;
}

export class PaginatedResponseDto<T> {
    @ApiProperty({ description: 'Listado de resultados' })
    data: T[];

    @ApiProperty({ type: PaginationMetaDto })
    meta: PaginationMetaDto;
}