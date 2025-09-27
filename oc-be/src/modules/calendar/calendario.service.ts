import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../config/prisma/prisma.service";
import { CalendarSuggestionDto } from './DTO/calendario-post.dto';
import { TipoCuidado } from 'src/utils/tipoCuidado.utils';


@Injectable()
export class CalendarService {
    constructor(private prisma: PrismaService) { }

    async suggestCalendar(dto: CalendarSuggestionDto): Promise<Date[]> {
        const { idPlanta, fechaInicio, fechaFin, tipo, frecuenciaDias = 1 } = dto;

        const startDate = new Date(fechaInicio);
        const endDate = new Date(fechaFin);

        const cuidadosExistentes = await this.prisma.cuidado.findMany({
            where: {
                idPlanta,
                tipo: { in: ['fertilizacion', 'poda'] },
                fechaInicio: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: { fechaInicio: 'asc' },
        });

        const suggestions: Date[] = [];
        let current = new Date(startDate);

        while (current <= endDate) {
            if (this.isValidDateOptimized(tipo, current, cuidadosExistentes)) {
                suggestions.push(new Date(current));
            }

            current.setDate(current.getDate() + frecuenciaDias);
        }

        return suggestions;
    }

    private isValidDateOptimized(
        tipo: TipoCuidado,
        date: Date,
        cuidadosExistentes: { tipo: string; fechaInicio: Date }[],
    ): boolean {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        if (tipo === TipoCuidado.RIEGO) {
            const riegoValido = !cuidadosExistentes.some(
                (c) =>
                    c.tipo === TipoCuidado.FERTILIZACION &&
                    date.getTime() - new Date(c.fechaInicio).getTime() >= 0 &&
                    date.getTime() - new Date(c.fechaInicio).getTime() <= 24 * 60 * 60 * 1000,
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
