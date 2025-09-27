import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { PlantasPostDto } from './DTO/plantas-post.dto';

@Injectable()
export class PlantasService {
    constructor(private prisma: PrismaService) { }
    async getAllplantas() {
        return this.prisma.planta.findMany({
            include: { cuidados: true },
        });
    }

    async getPlantaById(id: number) {
        return this.prisma.planta.findUnique({
            where: { id },
        });
    }

    async createPlanta(dto: PlantasPostDto) {
        return this.prisma.planta.create({
            data: {
                nombre: dto.nombre,
                especie: dto.especie,
                ubicacion: dto.ubicacion,
            },
            include: { cuidados: true },
        });
    }

    async updatePlanta(id: number, dto: PlantasPostDto) {
        return this.prisma.planta.update({
            where: { id },
            data: {
                nombre: dto.nombre,
                especie: dto.especie,
                ubicacion: dto.ubicacion,

            },
        });
    }

    async deletePlanta(id: number) {
        return this.prisma.planta.delete({
            where: { id },
        });
    }
}