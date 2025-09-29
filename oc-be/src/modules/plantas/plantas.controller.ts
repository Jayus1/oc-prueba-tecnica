import { Controller, Get, Post, Delete, Put, Body, Param, Query, HttpCode, HttpStatus } from "@nestjs/common";
import { PlantasService } from './plantas.service';
import { ApiBody } from "@nestjs/swagger";
import { PlantasPostDto } from "./DTO/plantas-post.dto";
import { PaginationParamsDto } from "src/DTOs/PaginationParams.dto";
import { PaginatedResponseDto } from "src/DTOs/PaginatedResponse.dto";
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
    async getplantaById(@Param("id") id: number) {
        return this.plantasService.getPlantaById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ description: 'Crear planta', type: PlantasPostDto })
    async createplanta(@Body() data: PlantasPostDto) {
        return this.plantasService.createPlanta(data);
    }

    @Put(':id')
    @ApiBody({ description: 'Editar planta', type: PlantasPostDto })
    async updateplanta(@Param("id") id: number, @Body() data: PlantasPostDto) {
        return this.plantasService.updatePlanta(Number(id), data);
    }

    @Delete(':id')
    async deleteplanta(@Param("id") id: number) {
        return this.plantasService.deletePlanta(Number(id));
    }
}