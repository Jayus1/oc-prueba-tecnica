import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { Ubicacion } from '@prisma/client';

@Injectable()
export class UbicacionesService {
    constructor(private prisma: PrismaService) {}

    async getAllUbicaciones(): Promise<Ubicacion[]> {
        return this.prisma.ubicacion.findMany({
            orderBy: {
                nombre: 'asc'
            }
        });
    }

    async getUbicacionById(id: number): Promise<Ubicacion | null> {
        return this.prisma.ubicacion.findUnique({
            where: { id }
        });
    }

    async createUbicacion(data: { nombre: string; descripcion?: string }): Promise<Ubicacion> {
        return this.prisma.ubicacion.create({
            data
        });
    }

    async updateUbicacion(id: number, data: { nombre?: string; descripcion?: string }): Promise<Ubicacion> {
        return this.prisma.ubicacion.update({
            where: { id },
            data
        });
    }

    async deleteUbicacion(id: number): Promise<Ubicacion> {
        return this.prisma.ubicacion.delete({
            where: { id }
        });
    }
}