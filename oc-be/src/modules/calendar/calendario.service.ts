import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../config/prisma/prisma.service";
import { CalendarSuggestionDto } from './DTO/calendario-post.dto';
import { TipoCuidado } from '@prisma/client';
import { CuidadosValidationsUtils } from 'src/utils/cuidadosValidation.util';

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
                tipo: { in: [TipoCuidado.FERTILIZACION, TipoCuidado.PODA] },
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
            if (CuidadosValidationsUtils.isValidDateOptimized(tipo, current, cuidadosExistentes)) {
                suggestions.push(new Date(current));
            }

            current.setDate(current.getDate() + frecuenciaDias);
        }

        return suggestions;
    }

}
