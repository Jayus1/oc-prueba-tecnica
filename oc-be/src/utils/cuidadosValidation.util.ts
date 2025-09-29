import { TipoCuidado } from "@prisma/client";
import { PrismaService } from "src/config/prisma/prisma.service";
import { ValidationResult } from "src/dtos/cuidadosValidations.dto";

export class CuidadosValidationsUtils {

    static async validateEmptyTime(
        fechaInicio: string,
        prisma: PrismaService,
        idPlanta: string,
        fechaFin?: string,
        idExclude?: string
    ): Promise<ValidationResult> {
        if (!fechaFin) {
            return { isValid: true };
        }

        const startTime = new Date(fechaInicio);
        const endTime = new Date(fechaFin);

        if (startTime >= endTime) {
            return {
                isValid: false,
                errorMessage: 'La fecha de inicio debe ser anterior a la fecha de fin.',
            };
        }

        const cuidadoExistente = await prisma.cuidado.findFirst({
            where: {
                NOT: idExclude ? {
                    id: idExclude
                } : undefined,
                isActive: true,
                idPlanta,
                OR: [
                    {
                        fechaInicio: { lte: startTime },
                        fechaFin: { gte: startTime },
                    },
                    {
                        fechaInicio: { lte: endTime },
                        fechaFin: { gte: endTime },
                    },
                    {
                        fechaInicio: { gte: startTime },
                        fechaFin: { lte: endTime },
                    },
                ],
            },
        });

        if (cuidadoExistente) {
            return {
                isValid: false,
                errorMessage:
                    'Las fechas seleccionadas coinciden con otro cuidado ya programado. Por favor, elige un rango diferente.'
                ,
            };
        }

        return { isValid: true };
    }

    static validateDates(fechaInicio: string, fechaFin?: string): ValidationResult {
        if (!fechaFin) return { isValid: true };

        const startTime = new Date(fechaInicio);
        const endTime = new Date(fechaFin);

        if (startTime >= endTime) {
            return {
                isValid: false,
                errorMessage: 'La fecha de inicio debe ser anterior a la fecha de fin.'
            };
        }

        return { isValid: true };
    }

    static async validateRiegoTime(
        tipo: TipoCuidado,
        fechaInicio: string,
        idPlanta: string,
        prisma: PrismaService
    ): Promise<ValidationResult> {
        if (tipo !== TipoCuidado.RIEGO) return { isValid: true };

        const fechaRiego = new Date(fechaInicio);
        const fecha24hAntes = new Date(fechaRiego.getTime() - 24 * 60 * 60 * 1000);

        const listFertilizacion = await prisma.cuidado.findMany({
            where: {
                idPlanta,
                tipo: TipoCuidado.FERTILIZACION,
                fechaFin: {
                    gte: fecha24hAntes,
                    lte: fechaRiego,
                },
            },
            orderBy: { fechaInicio: 'desc' },
        });

        if (listFertilizacion.length > 0) {
            return {
                isValid: false,
                errorMessage: 'No se puede regar la planta dentro de las 24 horas posteriores a una fertilización.'
            };
        }

        return { isValid: true };
    }

    static async validateFertilizacionAndPoda(
        tipo: TipoCuidado,
        fechaInicio: string,
        idPlanta: string,
        prisma: PrismaService
    ): Promise<ValidationResult> {
        if (tipo === TipoCuidado.LUZ || tipo === TipoCuidado.RIEGO) {
            return { isValid: true };
        }

        const fecha = new Date(fechaInicio);
        const startOfDay = new Date(fecha);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(fecha);
        endOfDay.setHours(23, 59, 59, 999);

        const existing = await prisma.cuidado.findFirst({
            where: {
                idPlanta,
                tipo: tipo === TipoCuidado.PODA ? TipoCuidado.FERTILIZACION : TipoCuidado.PODA,
                fechaInicio: {
                    gte: startOfDay,
                    lte: endOfDay
                },
            },
        });

        if (existing) {
            return {
                isValid: false,
                errorMessage: 'No se puede registrar una poda o fertilización en la misma planta el mismo día.'
            };
        }

        return { isValid: true };
    }

    static async validateCuidado(
        tipo: TipoCuidado,
        fechaInicio: string,
        idPlanta: string,
        prisma: PrismaService,
        fechaFin?: string,
        idExclude?: string
    ): Promise<ValidationResult> {
        const dateValidation = this.validateDates(fechaInicio, fechaFin);
        if (!dateValidation.isValid) return dateValidation;


        const emptyTimeValidacion = await this.validateEmptyTime(fechaInicio, prisma, idPlanta, fechaFin, idExclude);
        if (!emptyTimeValidacion.isValid) return emptyTimeValidacion


        const riegoValidation = await this.validateRiegoTime(tipo, fechaInicio, idPlanta, prisma);
        if (!riegoValidation.isValid) return riegoValidation;


        const podaFertilizacionValidation = await this.validateFertilizacionAndPoda(
            tipo,
            fechaInicio,
            idPlanta,
            prisma
        );

        if (!podaFertilizacionValidation.isValid)
            return podaFertilizacionValidation;

        return { isValid: true };
    }

    static isValidDateOptimized(
        tipo: TipoCuidado,
        date: Date,
        cuidadosExistentes: { tipo: string; fechaInicio: Date, fechaFin?: Date | null }[],
    ): boolean {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        if (tipo === TipoCuidado.RIEGO) {
            const riegoValido = !cuidadosExistentes.some(
                (c) =>
                    c.tipo === TipoCuidado.FERTILIZACION &&
                    date.getTime() - new Date(c.fechaFin ?? c.fechaInicio).getTime() >= 0 &&
                    date.getTime() - new Date(c.fechaFin ?? c.fechaInicio).getTime() <= 24 * 60 * 60 * 1000,
            );
            if (!riegoValido) return false;
        }

        if (tipo === TipoCuidado.FERTILIZACION || tipo === TipoCuidado.PODA) {
            const sameDayExists = cuidadosExistentes.some((c) => {
                if (c.tipo === 'riego') return false;
                const cDate = new Date(c.fechaInicio);
                return cDate >= startOfDay && cDate <= endOfDay;
            });
            if (sameDayExists) return false;
        }

        return true;
    }
}