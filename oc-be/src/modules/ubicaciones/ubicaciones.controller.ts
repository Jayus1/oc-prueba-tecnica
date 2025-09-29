import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UbicacionesService } from "./ubicaciones.service";
import { UbicacionPostDto } from "./DTO/ubicacion-post.dto";
import { Ubicacion } from "@prisma/client";

@ApiTags('ubicaciones')
@Controller('ubicaciones')
export class UbicacionesController {
    constructor(private readonly ubicacionesService: UbicacionesService) {}

    @Get()
    async getAllUbicaciones(): Promise<Ubicacion[]> {
        return this.ubicacionesService.getAllUbicaciones();
    }

    @Get(':id')
    async getUbicacionById(@Param("id") id: number): Promise<Ubicacion | null> {
        return this.ubicacionesService.getUbicacionById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ description: 'Crear ubicación', type: UbicacionPostDto })
    async createUbicacion(@Body() data: UbicacionPostDto): Promise<Ubicacion> {
        return this.ubicacionesService.createUbicacion(data);
    }

    @Put(':id')
    @ApiBody({ description: 'Actualizar ubicación', type: UbicacionPostDto })
    async updateUbicacion(@Param("id") id: number, @Body() data: UbicacionPostDto): Promise<Ubicacion> {
        return this.ubicacionesService.updateUbicacion(Number(id), data);
    }

    @Delete(':id')
    async deleteUbicacion(@Param("id") id: number): Promise<Ubicacion> {
        return this.ubicacionesService.deleteUbicacion(Number(id));
    }
}