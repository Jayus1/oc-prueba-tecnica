import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { ApiBody, ApiTags, ApiQuery } from "@nestjs/swagger";
import { UbicacionesService } from "./ubicaciones.service";
import { UbicacionPostDto } from "./dtos/ubicacionPost.dto";
import { Ubicacion } from "@prisma/client";
import { PaginationParamsDto } from "../../dtos/paginationParams.dto";
import { PaginatedResponseDto } from "../../dtos/paginatedResponse.dto";

@ApiTags('ubicaciones')
@Controller('ubicaciones')
export class UbicacionesController {
    constructor(private readonly ubicacionesService: UbicacionesService) { }

    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página (empieza en 1)', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad de items por página', example: 10 })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Buscar por nombre' })
    async getAllUbicaciones(@Query() paginationParams: PaginationParamsDto): Promise<PaginatedResponseDto<Ubicacion>> {
        return this.ubicacionesService.getAllUbicaciones(paginationParams);
    }

    @Get('select')
    async getUbicacionesForSelect(): Promise<Ubicacion[]> {
        return this.ubicacionesService.getUbicacionesForSelect();
    }

    @Get('by-id')
    @ApiQuery({ name: 'id', required: true, type: String, description: 'ID de la ubicación' })
    async getUbicacionById(@Query("id") id: string): Promise<Ubicacion | null> {
        return this.ubicacionesService.getUbicacionById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ description: 'Crear ubicación', type: UbicacionPostDto })
    async createUbicacion(@Body() data: UbicacionPostDto): Promise<Ubicacion> {
        return this.ubicacionesService.createUbicacion(data);
    }

    @Put(':id')
    @ApiBody({ description: 'Actualizar ubicación', type: UbicacionPostDto })
    async updateUbicacion(@Param("id") id: string, @Body() data: UbicacionPostDto): Promise<Ubicacion> {
        return this.ubicacionesService.updateUbicacion(id, data);
    }

    @Delete(':id')
    async deleteUbicacion(@Param("id") id: string): Promise<Ubicacion> {
        return this.ubicacionesService.deleteUbicacion(id);
    }
}