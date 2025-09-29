import { Controller, Post, Body, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CalendarSuggestionDto } from './dtos/calendarioPost.dto';
import { CalendarService } from './calendario.service';
import { PaginationParamsDto } from '../../dtos/paginationParams.dto';
import { PaginatedResponseDto } from '../../dtos/paginatedResponse.dto';


@Controller('calendar')
export class CalendarController {
    constructor(private calendarService: CalendarService) { }


    @Post('suggestions')
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página (empieza en 1)', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad de items por página', example: 10 })
    async getSuggestions(
        @Body() dto: CalendarSuggestionDto,
        @Query() paginationParams: PaginationParamsDto
    ): Promise<PaginatedResponseDto<string>> {
        return this.calendarService.suggestCalendar(dto, paginationParams);
    }
}
