import { Controller, Get, Post, Delete, Put, Body, Param, Query, HttpCode, HttpStatus } from "@nestjs/common";
import { CuidadosService } from "./cuidados.service";
import { CuidadosPostDto } from "./DTO/cuidados-post.dto";
import { ApiBody } from "@nestjs/swagger";
import { PaginationParamsDto } from "src/DTOs/PaginationParams.dto";
import { Cuidado } from "@prisma/client";
import { PaginatedResponseDto } from "src/DTOs/PaginatedResponse.dto";

@Controller('cuidados')
export class CuidadosController {
    constructor(private readonly cuidadosService: CuidadosService) { }
    @Get()
    async getAllCuidados(@Query() filtro: PaginationParamsDto): Promise<PaginatedResponseDto<Cuidado>> {
        return this.cuidadosService.getAllCuidados(filtro);
    }
    @Get(':id')
    async getCuidadoById(@Param("id") id: number) {
        return this.cuidadosService.getCuidadoById(Number(id));
    }

    @Get('planta/:id')
    async getCuidadosByPlantId(@Param("id") id: number) {
        return this.cuidadosService.getCuidadosByPlantId(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ description: 'Crear cuidado', type: CuidadosPostDto })
    async createCuidado(@Body() data: CuidadosPostDto) {

        return this.cuidadosService.createCuidado(data);
    }

    @Put(':id')
    async updateCuidado(@Param("id") id: number, @Body() data: CuidadosPostDto) {

        return this.cuidadosService.updateCuidado(Number(id), data);
    }

    @Delete(':id')
    async deleteCuidado(@Param("id") id: number) {
        return this.cuidadosService.deleteCuidado(Number(id));
    }
}