import { ApiProperty } from "@nestjs/swagger"
import { TipoCuidado } from "src/utils/tipoCuidado.utils"


export class CuidadosPostDto {

    @ApiProperty()
    idPlanta: number

    @ApiProperty()
    tipo: TipoCuidado

    @ApiProperty()
    fechaInicio: Date

    @ApiProperty()
    fechaFin: Date

    @ApiProperty({ required: false })
    notas?: string
}   