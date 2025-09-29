import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../config/prisma/prisma.service";
import { CalendarSuggestionDto } from './dtos/calendarioPost.dto';
import { TipoCuidado } from '@prisma/client';
import { CuidadosValidationsUtils } from 'src/utils/cuidadosValidation.util';
import { PaginationParamsDto } from '../../dtos/paginationParams.dto';
import { PaginatedResponseDto } from '../../dtos/paginatedResponse.dto';

@Injectable()
export class CalendarService {
    constructor(private prisma: PrismaService) { }

    async suggestCalendar(dto: CalendarSuggestionDto, paginationParams: PaginationParamsDto): Promise<PaginatedResponseDto<string>> {
        const { idPlanta, fechaInicio, fechaFin, tipo, frecuenciaDias = 1 } = dto;
        const { page = 1, limit = 10 } = paginationParams;

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

        const allSuggestions: Date[] = [];
        let current = new Date(startDate);

        while (current <= endDate) {
            if (CuidadosValidationsUtils.isValidDateOptimized(tipo, current, cuidadosExistentes)) {
                allSuggestions.push(new Date(current));
            }

            current.setDate(current.getDate() + frecuenciaDias);
        }

        const total = allSuggestions.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedSuggestions = allSuggestions.slice(startIndex, endIndex);

        const data = paginatedSuggestions.map(date => date.toISOString());

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


}
