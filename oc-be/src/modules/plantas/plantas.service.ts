import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { PlantasPostDto } from './DTO/plantas-post.dto';
import { PaginationParamsDto } from 'src/DTOs/PaginationParams.dto';
import { Planta } from '@prisma/client';
import { PaginatedResponseDto } from 'src/DTOs/PaginatedResponse.dto';

@Injectable()
export class PlantasService {
    constructor(private prisma: PrismaService) { }

    async getAllPlantasForSelect(): Promise<Planta[]> {
        return this.prisma.planta.findMany({
            where: {
                isActive: true,
            },
            include: {
                especie: true,
                ubicacion: true,
            },
            orderBy: {
                nombre: 'asc'
            }
        });
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
                }
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
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getPlantaById(id: number): Promise<Planta> {
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

        if (!planta) {
            throw new NotFoundException(`No se encontró la planta con ID ${id}`);
        }

        return planta;
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

    async updatePlanta(id: number, dto: PlantasPostDto) {
        const plantExist = await this.prisma.planta.findUnique({
            where: { id }
        });

        if (!plantExist) {
            throw new NotFoundException(`No se encontró la planta con ID ${id}`);
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

    async deletePlanta(id: number) {
        const plantExist = await this.prisma.planta.findUnique({
            where: { id }
        });

        if (!plantExist) {
            throw new NotFoundException(`No se encontró la planta con ID ${id}`);
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