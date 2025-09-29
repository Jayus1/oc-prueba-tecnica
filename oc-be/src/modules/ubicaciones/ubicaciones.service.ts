import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { Ubicacion } from '@prisma/client';
import { PaginationParamsDto } from '../../dtos/paginationParams.dto';
import { PaginatedResponseDto } from '../../dtos/paginatedResponse.dto';

@Injectable()
export class UbicacionesService {
    constructor(private prisma: PrismaService) { }

    async getAllUbicaciones(paginationParams: PaginationParamsDto): Promise<PaginatedResponseDto<Ubicacion>> {
        const { page = 1, limit = 10, search } = paginationParams;

        const where = search
            ? {
                nombre: {
                    contains: search,
                    mode: 'insensitive' as const
                }
            }
            : {
            };

        const [data, total] = await Promise.all([
            this.prisma.ubicacion.findMany({
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
            this.prisma.ubicacion.count({
                where: {
                    isActive: true,
                    ...where
                },
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

    async getUbicacionesForSelect(): Promise<Ubicacion[]> {
        return this.prisma.ubicacion.findMany({
            where: {
                isActive: true
            },
            orderBy: {
                nombre: 'asc'
            }
        });
    }

    async getUbicacionById(id: string): Promise<Ubicacion | null> {
        const ubicacion = await this.prisma.ubicacion.findUnique({
            where: { id }
        });

        if (!ubicacion || !ubicacion.isActive) {
            throw new NotFoundException(`Ubicación no encontrada`);
        }

        return ubicacion;
    }

    async createUbicacion(data: { nombre: string; descripcion?: string }): Promise<Ubicacion> {
        return this.prisma.ubicacion.create({
            data
        });
    }

    async updateUbicacion(id: string, data: { nombre?: string; descripcion?: string }): Promise<Ubicacion> {
        const existingUbicacion = await this.prisma.ubicacion.findUnique({
            where: { id }
        });

        if (!existingUbicacion || !existingUbicacion.isActive) {
            throw new NotFoundException(`Ubicación no encontrada`);
        }

        return this.prisma.ubicacion.update({
            where: { id },
            data
        });
    }

    async deleteUbicacion(id: string): Promise<Ubicacion> {
        const existingUbicacion = await this.prisma.ubicacion.findUnique({
            where: { id }
        });

        if (!existingUbicacion || !existingUbicacion.isActive) {
            throw new NotFoundException(`Ubicación no encontrada`);
        }

        return this.prisma.ubicacion.update({
            where: { id },
            data: {
                isActive: false
            }
        });
    }
}