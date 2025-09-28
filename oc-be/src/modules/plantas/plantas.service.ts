import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { PlantasPostDto } from './DTO/plantas-post.dto';
import { FilterPlantasDto } from 'src/DTO/filter-plantas.dto';

@Injectable()
export class PlantasService {
    constructor(private prisma: PrismaService) { }
    async getAllplantas(filters?: FilterPlantasDto) {
        return this.prisma.planta.findMany({
            include: {
                cuidados: {
                    orderBy: {
                        fechaInicio: "desc"
                    }
                }
            },
            where: {
                nombre: {
                    contains: filters?.nombre,
                    mode: "insensitive"
                }
            },

            orderBy: {
                fechaRegistro: 'desc'
            }
        });
    }

    async getPlantaById(id: number) {
        return this.prisma.planta.findUnique({
            where: { id },
            include: { cuidados: true },

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