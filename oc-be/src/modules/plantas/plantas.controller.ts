import { Controller, Get, Post, Delete, Put, Body, Param } from "@nestjs/common";
import { PlantasService } from './plantas.service';
import { ApiBody } from "@nestjs/swagger";
import { PlantasPostDto } from "./DTO/plantas-post.dto";


@Controller('plantas')
export class PlantasController {
    constructor(private readonly plantasService: PlantasService) { }
    @Get()
    async getAllplantas() {
        return this.plantasService.getAllplantas();
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