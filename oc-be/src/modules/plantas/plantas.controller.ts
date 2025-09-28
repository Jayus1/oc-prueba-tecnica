import { Controller, Get, Post, Delete, Put, Body, Param, Query } from "@nestjs/common";
import { PlantasService } from './plantas.service';
import { ApiBody } from "@nestjs/swagger";
import { PlantasPostDto } from "./DTO/plantas-post.dto";
import { FilterPlantasDto } from "src/DTO/filter-plantas.dto";


@Controller('plantas')
export class PlantasController {
    constructor(private readonly plantasService: PlantasService) { }
    @Get()
    async getAllplantas(@Query() filtro?: FilterPlantasDto) {
        return this.plantasService.getAllplantas(filtro);
    }
    @Get(':id')
    async getplantaById(@Param("id") id: number) {
        return this.plantasService.getPlantaById(Number(id));
    }

    @Post()
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