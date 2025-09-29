import { ConflictException, Inject, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../config/prisma/prisma.service";
import { CuidadosPostDto } from "./dtos/cuidadosPost.dto";
import { Cuidado } from "@prisma/client";
import { PaginatedResponseDto } from "src/dtos/paginatedResponse.dto";
import { PaginationParamsDto } from "src/dtos/paginationParams.dto";
import { CuidadosValidationsUtils } from "src/utils/cuidadosValidation.util";

export class CuidadosService {
    constructor(@Inject(PrismaService) private prisma: PrismaService) { }
    async getAllCuidados(filters: PaginationParamsDto): Promise<PaginatedResponseDto<Cuidado>> {

        const { page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.prisma.cuidado.findMany({
                take: filters.limit,
                skip,
                orderBy: {
                    id: 'desc'
                },
                where: {
                    isActive: true,
                },

            }),
            this.prisma.cuidado.count({
                where: {
                    isActive: true,
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
    async getCuidadoById(id: string): Promise<Cuidado> {

        const cuidado = await this.prisma.cuidado.findUnique({
            where: { id },
        });

        if (!cuidado || !cuidado.isActive) {
            throw new NotFoundException(`No se encontró el cuidado`);
        }

        return cuidado;
    }

    async getCuidadosByPlantId(id: string): Promise<Cuidado[]> {
        const plantas = await this.prisma.planta.findUnique({
            where: {
                id,
                isActive: true,
            },
        });

        if (!plantas || !plantas.isActive) {
            throw new NotFoundException(`El ID de esa planta no existe`);
        }

        const cuidado = await this.prisma.cuidado.findMany({
            where: {
                idPlanta: id,
                isActive: true,
                fechaFin: {
                    gte: new Date()
                }
            },
        });

        return cuidado;
    }

    async createCuidado(data: CuidadosPostDto) {
        const validation = await CuidadosValidationsUtils.validateCuidado(
            data.tipo,
            data.fechaInicio.toString(),
            data.idPlanta,
            this.prisma,
            data.fechaFin?.toString()
        );

        if (!validation.isValid) {
            throw new ConflictException(validation.errorMessage);
        }

        return this.prisma.cuidado.create({
            data,
        });
    }

    async updateCuidado(id: string, data: CuidadosPostDto) {

        const cuidado = await this.prisma.cuidado.findUnique({
            where: { id },
        });

        if (!cuidado || !cuidado.isActive) {
            throw new NotFoundException(`No se encontró el cuidado`);
        }

        const validation = await CuidadosValidationsUtils.validateCuidado(
            data.tipo,
            data.fechaInicio.toString(),
            data.idPlanta,
            this.prisma,
            data.fechaFin?.toString(),
            id
        );

        if (!validation.isValid) {
            throw new ConflictException(validation.errorMessage);
        }

        return this.prisma.cuidado.update({
            where: { id },
            data,
        });
    }

    async deleteCuidado(id: string) {
        const cuidado = await this.prisma.cuidado.findUnique({
            where: { id },
        });

        if (!cuidado || !cuidado.isActive) {
            throw new NotFoundException(`No se encontró el cuidado`);
        }

        return this.prisma.cuidado.update({
            data: {
                isActive: false
            },
            where: { id },
        });
    }
}
