
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterPlantasDto {
    @ApiPropertyOptional({
        description: 'Nombre de la planta',
        example: 'Rosa',
    })
    nombre?: string;

    @ApiPropertyOptional({
        description: 'Número de página (paginación)',
        example: 1,
    })
    page?: number = 1;

    @ApiPropertyOptional({
        description: 'Cantidad de registros por página',
        example: 10,
    })
    limit?: number = 10;
}


