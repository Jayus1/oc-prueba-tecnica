import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { Especie } from '@prisma/client';
import { PaginationParamsDto } from '../../dtos/paginationParams.dto';
import { PaginatedResponseDto } from '../../dtos/paginatedResponse.dto';

@Injectable()
export class EspeciesService {
    constructor(private prisma: PrismaService) { }

    async getAllEspecies(paginationParams: PaginationParamsDto): Promise<PaginatedResponseDto<Especie>> {
        const { page = 1, limit = 10, search } = paginationParams;

        const where = search
            ? {
                OR: [
                    {
                        nombre: {
                            contains: search,
                            mode: 'insensitive' as const
                        }
                    },
                    {
                        nombreCientifico: {
                            contains: search,
                            mode: 'insensitive' as const
                        }
                    }
                ]
            }
            : {};

        const [data, total] = await Promise.all([
            this.prisma.especie.findMany({
                where: {
                    isActive: true,
                    ...where
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    nombre: 'asc'
                }
            }),
            this.prisma.especie.count({
                where: {
                    isActive: true,
                    ...where
                }
            })
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages
            }
        };
    }

    async getEspeciesForSelect(): Promise<Especie[]> {
        return this.prisma.especie.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                nombre: 'asc'
            }
        });
    }

    async getEspecieById(id: string): Promise<Especie | null> {
        const especie = await this.prisma.especie.findUnique({
            where: { id }
        });

        if (!especie || !especie.isActive) {
            throw new NotFoundException(`No se encontro esta especie`);
        }

        return especie;
    }

    async createEspecie(data: { nombre: string; nombreCientifico?: string; descripcion?: string }): Promise<Especie> {
        return this.prisma.especie.create({
            data
        });
    }

    async updateEspecie(id: string, data: { nombre?: string; nombreCientifico?: string; descripcion?: string }): Promise<Especie> {
        const existingEspecie = await this.prisma.especie.findUnique({
            where: { id }
        });

        if (!existingEspecie || !existingEspecie.isActive) {
            throw new NotFoundException(`No se encontro esta especie`);
        }

        return this.prisma.especie.update({
            where: { id },
            data
        });
    }

    async deleteEspecie(id: string): Promise<Especie> {
        const existingEspecie = await this.prisma.especie.findUnique({
            where: { id }
        });

        if (!existingEspecie || !existingEspecie.isActive) {
            throw new NotFoundException(`No se encontro esta especie`);
        }

        return this.prisma.especie.update({
            where: { id },
            data: {
                isActive: false
            }
        });
    }
}