import { Controller, Post, Body } from '@nestjs/common';
import { CalendarSuggestionDto } from './DTO/calendario-post.dto';
import { CalendarService } from './calendario.service';


@Controller('calendar')
export class CalendarController {
    constructor(private calendarService: CalendarService) { }

    @Post('suggestions')
    async getSuggestions(@Body() dto: CalendarSuggestionDto) {
        return this.calendarService.suggestCalendar(dto);
    }
}
