import { Controller, Get, Post, Delete, Put, Body, Param, Query, HttpCode, HttpStatus } from "@nestjs/common";
import { PlantasService } from './plantas.service';
import { ApiBody } from "@nestjs/swagger";
import { PlantasPostDto } from "./dtos/plantasPost.dto";
import { PaginationParamsDto } from "src/dtos/paginationParams.dto";
import { PaginatedResponseDto } from "src/dtos/paginatedResponse.dto";
import { Planta } from "@prisma/client";


@Controller('plantas')
export class PlantasController {
    constructor(private readonly plantasService: PlantasService) { }
    @Get('select')
    async getPlantasForSelect(): Promise<Planta[]> {
        return this.plantasService.getAllPlantasForSelect();
    }

    @Get()
    async getAllplantas(@Query() filtro: PaginationParamsDto): Promise<PaginatedResponseDto<Planta>> {
        return this.plantasService.getAllplantas(filtro);
    }

    @Get(':id')
    async getplantaById(@Param("id") id: string) {
        return this.plantasService.getPlantaById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ description: 'Crear planta', type: PlantasPostDto })
    async createplanta(@Body() data: PlantasPostDto) {
        return this.plantasService.createPlanta(data);
    }

    @Put(':id')
    @ApiBody({ description: 'Editar planta', type: PlantasPostDto })
    async updateplanta(@Param("id") id: string, @Body() data: PlantasPostDto) {
        return this.plantasService.updatePlanta(id, data);
    }

    @Delete(':id')
    async deleteplanta(@Param("id") id: string) {
        return this.plantasService.deletePlanta(id);
    }
}