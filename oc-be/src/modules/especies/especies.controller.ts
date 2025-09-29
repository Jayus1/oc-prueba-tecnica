import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { EspeciesService } from "./especies.service";
import { EspeciePostDto } from "./DTO/especie-post.dto";
import { Especie } from "@prisma/client";

@ApiTags('especies')
@Controller('especies')
export class EspeciesController {
    constructor(private readonly especiesService: EspeciesService) {}

    @Get()
    async getAllEspecies(): Promise<Especie[]> {
        return this.especiesService.getAllEspecies();
    }

    @Get(':id')
    async getEspecieById(@Param("id") id: number): Promise<Especie | null> {
        return this.especiesService.getEspecieById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ description: 'Crear especie', type: EspeciePostDto })
    async createEspecie(@Body() data: EspeciePostDto): Promise<Especie> {
        return this.especiesService.createEspecie(data);
    }

    @Put(':id')
    @ApiBody({ description: 'Actualizar especie', type: EspeciePostDto })
    async updateEspecie(@Param("id") id: number, @Body() data: EspeciePostDto): Promise<Especie> {
        return this.especiesService.updateEspecie(Number(id), data);
    }

    @Delete(':id')
    async deleteEspecie(@Param("id") id: number): Promise<Especie> {
        return this.especiesService.deleteEspecie(Number(id));
    }
}