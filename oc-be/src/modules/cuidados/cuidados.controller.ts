import { Controller, Get, Post, Delete, Put, Body, Param } from "@nestjs/common";
import { CuidadosService } from "./cuidados.service";
import { CuidadosPostDto } from "./DTO/cuidados-post.dto";
import { ApiBody } from "@nestjs/swagger";

@Controller('cuidados')
export class CuidadosController {
    constructor(private readonly cuidadosService: CuidadosService) { }
    @Get()
    async getAllCuidados() {
        return this.cuidadosService.getAllCuidados();
    }
    @Get(':id')
    async getCuidadoById(@Param("id") id: number) {
        return this.cuidadosService.getCuidadoById(Number(id));
    }
    @Post()
    @ApiBody({ description: 'Crear cuidado', type: CuidadosPostDto })
    async createCuidado(@Body() data: CuidadosPostDto) {
        await this.cuidadosService.validateTimes(data);
        await this.cuidadosService.validateRiegoTime(data);
        await this.cuidadosService.validateFertilizacionAndPoda(data);

        return this.cuidadosService.createCuidado(data);
    }


    @Put(':id')
    @ApiBody({ description: 'Editar cuidado', type: CuidadosPostDto })
    async updateCuidado(id: number, @Body() data: CuidadosPostDto) {

        await this.cuidadosService.validateTimes(data);
        await this.cuidadosService.validateRiegoTime(data);
        await this.cuidadosService.validateFertilizacionAndPoda(data);

        return this.cuidadosService.updateCuidado(Number(id), data);
    }
    @Delete(':id')
    async deleteCuidado(id: number) {
        return this.cuidadosService.deleteCuidado(Number(id));
    }
}