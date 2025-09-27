import { ApiProperty } from "@nestjs/swagger"

export class PlantasPostDto {
    @ApiProperty()
    nombre: string

    @ApiProperty()
    especie: string

    @ApiProperty({ required: false })
    ubicacion?: string

}

