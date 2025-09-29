import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { ApiBody, ApiTags, ApiQuery } from "@nestjs/swagger";
import { EspeciesService } from "./especies.service";
import { EspeciePostDto } from "./dtos/especiePost.dto";
import { Especie } from "@prisma/client";
import { PaginationParamsDto } from "../../dtos/paginationParams.dto";
import { PaginatedResponseDto } from "../../dtos/paginatedResponse.dto";

@ApiTags('especies')
@Controller('especies')
export class EspeciesController {
    constructor(private readonly especiesService: EspeciesService) { }

    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página (empieza en 1)', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad de items por página', example: 10 })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Buscar por nombre o nombre científico' })
    async getAllEspecies(@Query() paginationParams: PaginationParamsDto): Promise<PaginatedResponseDto<Especie>> {
        return this.especiesService.getAllEspecies(paginationParams);
    }

    @Get('select')
    async getEspeciesForSelect(): Promise<Especie[]> {
        return this.especiesService.getEspeciesForSelect();
    }

    @Get('by-id')
    @ApiQuery({ name: 'id', required: true, type: String, description: 'ID de la especie' })
    async getEspecieById(@Query("id") id: string): Promise<Especie | null> {
        return this.especiesService.getEspecieById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ description: 'Crear especie', type: EspeciePostDto })
    async createEspecie(@Body() data: EspeciePostDto): Promise<Especie> {
        return this.especiesService.createEspecie(data);
    }

    @Put(':id')
    @ApiBody({ description: 'Actualizar especie', type: EspeciePostDto })
    async updateEspecie(@Param("id") id: string, @Body() data: EspeciePostDto): Promise<Especie> {
        return this.especiesService.updateEspecie(id, data);
    }

    @Delete(':id')
    async deleteEspecie(@Param("id") id: string): Promise<Especie> {
        return this.especiesService.deleteEspecie(id);
    }
}