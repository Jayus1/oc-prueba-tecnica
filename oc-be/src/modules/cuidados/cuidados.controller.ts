import { Controller, Get, Post, Delete, Put, Body, Param, Query, HttpCode, HttpStatus } from "@nestjs/common";
import { CuidadosService } from "./cuidados.service";
import { CuidadosPostDto } from "./dtos/cuidadosPost.dto";
import { ApiBody } from "@nestjs/swagger";
import { PaginationParamsDto } from "src/dtos/paginationParams.dto";
import { Cuidado } from "@prisma/client";
import { PaginatedResponseDto } from "src/dtos/paginatedResponse.dto";

@Controller('cuidados')
export class CuidadosController {
    constructor(private readonly cuidadosService: CuidadosService) { }
    @Get()
    async getAllCuidados(@Query() filtro: PaginationParamsDto): Promise<PaginatedResponseDto<Cuidado>> {
        return this.cuidadosService.getAllCuidados(filtro);
    }
    @Get(':id')
    async getCuidadoById(@Param("id") id: string) {
        return this.cuidadosService.getCuidadoById(id);
    }

    @Get('planta/:id')
    async getCuidadosByPlantId(@Param("id") id: string) {
        return this.cuidadosService.getCuidadosByPlantId(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ description: 'Crear cuidado', type: CuidadosPostDto })
    async createCuidado(@Body() data: CuidadosPostDto) {

        return this.cuidadosService.createCuidado(data);
    }

    @Put(':id')
    async updateCuidado(@Param("id") id: string, @Body() data: CuidadosPostDto) {

        return this.cuidadosService.updateCuidado(id, data);
    }

    @Delete(':id')
    async deleteCuidado(@Param("id") id: string) {
        return this.cuidadosService.deleteCuidado(id);
    }
}