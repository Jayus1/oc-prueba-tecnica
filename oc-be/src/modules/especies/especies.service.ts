import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { Especie } from '@prisma/client';

@Injectable()
export class EspeciesService {
    constructor(private prisma: PrismaService) {}

    async getAllEspecies(): Promise<Especie[]> {
        return this.prisma.especie.findMany({
            orderBy: {
                nombre: 'asc'
            }
        });
    }

    async getEspecieById(id: number): Promise<Especie | null> {
        return this.prisma.especie.findUnique({
            where: { id }
        });
    }

    async createEspecie(data: { nombre: string; nombreCientifico?: string; descripcion?: string }): Promise<Especie> {
        return this.prisma.especie.create({
            data
        });
    }

    async updateEspecie(id: number, data: { nombre?: string; nombreCientifico?: string; descripcion?: string }): Promise<Especie> {
        return this.prisma.especie.update({
            where: { id },
            data
        });
    }

    async deleteEspecie(id: number): Promise<Especie> {
        return this.prisma.especie.delete({
            where: { id }
        });
    }
}