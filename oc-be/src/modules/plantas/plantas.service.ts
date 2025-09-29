import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { PlantasPostDto } from './dtos/plantasPost.dto';
import { PaginationParamsDto } from 'src/dtos/paginationParams.dto';
import { Planta } from '@prisma/client';
import { PaginatedResponseDto } from 'src/dtos/paginatedResponse.dto';

@Injectable()
export class PlantasService {
    constructor(private prisma: PrismaService) { }

    async getAllPlantasForSelect() {
        const result = await this.prisma.planta.findMany({

            where: {
                isActive: true,
            },
            include: {
                especie: true,
                ubicacion: true,
            },
            orderBy: {
                nombre: 'asc'
            },
        });

        return result.map((p) => {
            return {
                ...p,
                ubicacion: p.ubicacion?.nombre ?? "",
                especie: p.especie.nombre
            }
        })
    }

    async getAllplantas(filters: PaginationParamsDto): Promise<PaginatedResponseDto<Planta>> {
        const { page = 1, limit = 10, search } = filters;
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.prisma.planta.findMany({
                take: filters.limit,
                skip,
                include: {
                    especie: true,
                    ubicacion: true,
                    cuidados: {
                        where: {
                            isActive: true
                        },
                        orderBy: {
                            fechaInicio: "desc"
                        }
                    }
                },
                where: {
                    isActive: true,
                    nombre: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                orderBy: {
                    fechaRegistro: 'desc'
                },
            }),
            this.prisma.planta.count({
                where: {
                    isActive: true,
                    nombre: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
            })
        ]);

        return {
            data: data.map(p => ({ ...p, especie: p.especie.nombre, ubicacion: p.ubicacion?.nombre ?? '' })),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getPlantaById(id: string) {
        const planta = await this.prisma.planta.findUnique({
            where: { id },
            include: {
                especie: true,
                ubicacion: true,
                cuidados: {
                    where: {
                        isActive: true
                    },
                    orderBy: {
                        fechaInicio: "desc"
                    }
                }
            },
        });

        if (!planta || !planta.isActive) {
            throw new NotFoundException(`No se encontró la planta`);
        }

        return {
            ...planta,
            especie: planta.especie.nombre,
            ubicacion: planta.ubicacion?.nombre ?? ''
        };
    }

    async createPlanta(dto: PlantasPostDto) {
        return this.prisma.planta.create({
            data: {
                nombre: dto.nombre,
                idEspecie: dto.idEspecie,
                idUbicacion: dto.idUbicacion,
            },
            include: {
                especie: true,
                ubicacion: true,
            }
        });
    }

    async updatePlanta(id: string, dto: PlantasPostDto) {
        const plantExist = await this.prisma.planta.findUnique({
            where: { id }
        });

        if (!plantExist || !plantExist) {
            throw new NotFoundException(`No se encontró la planta`);
        }

        return this.prisma.planta.update({
            where: { id },
            data: {
                nombre: dto.nombre,
                idEspecie: dto.idEspecie,
                idUbicacion: dto.idUbicacion,
            },
            include: {
                especie: true,
                ubicacion: true,
            }
        });
    }

    async deletePlanta(id: string) {
        const plantExist = await this.prisma.planta.findUnique({
            where: { id }
        });

        if (!plantExist || !plantExist.isActive) {
            throw new NotFoundException(`No se encontró la planta`);
        }

        return this.prisma.planta.update({
            where: { id },
            data: {
                isActive: false
            },
            include: {
                especie: true,
                ubicacion: true,
            }
        });
    }
}