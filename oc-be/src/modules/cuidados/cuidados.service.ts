import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { PrismaService } from "../../config/prisma/prisma.service";
import { CuidadosPostDto } from "./DTO/cuidados-post.dto";
import { TipoCuidado } from "src/utils/tipoCuidado.utils";

export class CuidadosService {
    constructor(@Inject(PrismaService) private prisma: PrismaService) { }
    async getAllCuidados() {
        return this.prisma.cuidado.findMany();
    }
    async getCuidadoById(id: number) {
        return this.prisma.cuidado.findUnique({
            where: { id },
        });
    }
    async createCuidado(data: { idPlanta: number; tipo: string; fechaInicio: Date; fechaFin?: Date; notas?: string }) {
        return this.prisma.cuidado.create({
            data,
        });
    }
    async updateCuidado(id: number, data: { idPlanta: number; tipo: string; fechaInicio: Date; fechaFin?: Date; notas?: string }) {
        return this.prisma.cuidado.update({
            where: { id },
            data,
        });
    }
    async deleteCuidado(id: number) {
        return this.prisma.cuidado.delete({
            where: { id },
        });
    }

    async validateRiegoTime(data: CuidadosPostDto): Promise<void> {
        if (data.tipo !== TipoCuidado.RIEGO) return;

        const listFertilizacion = await this.prisma.cuidado.findMany({
            where: {
                idPlanta: data.idPlanta,
                tipo: { in: ['fertilizacion', 'Fertilización'] },
                fechaInicio: {
                    gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // últimas 24h
                },
            },
            orderBy: { fechaInicio: 'desc' },
        });

        if (listFertilizacion.length > 0) {
            throw new HttpException(
                'No se puede regar la planta dentro de las 24 horas posteriores a una fertilización.',
                HttpStatus.CONFLICT,
            );


        }
    }

    async validateTimes(data: CuidadosPostDto): Promise<void> {

        const startTime = new Date(data.fechaInicio);
        const endTime = data.fechaFin ? new Date(data.fechaFin) : null;

        if (endTime && startTime >= endTime) {
            throw new HttpException(
                'La fecha de inicio debe ser anterior a la fecha de fin.',
                HttpStatus.CONFLICT,
            );
        }
    }

    async validateFertilizacionAndPoda(data: CuidadosPostDto): Promise<void> {

        if (![TipoCuidado.PODA, TipoCuidado.FERTILIZACION].includes(data.tipo)) return;

        const fecha = new Date(data.fechaInicio);
        const startOfDay = new Date(fecha);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(fecha);
        endOfDay.setHours(23, 59, 59, 999);

        const existing = await this.prisma.cuidado.findFirst({
            where: {
                idPlanta: data.idPlanta,
                tipo: data.tipo == TipoCuidado.PODA ? TipoCuidado.FERTILIZACION : TipoCuidado.PODA,
                fechaInicio: {
                    gte: startOfDay,
                    lte: endOfDay
                },
            },
        });

        if (existing) {
            throw new HttpException(
                'No se puede registrar una poda o fertilización en la misma planta el mismo día.',
                HttpStatus.BAD_REQUEST,
            );
        }


    }
}
