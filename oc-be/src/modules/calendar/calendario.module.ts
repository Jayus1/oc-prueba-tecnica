import { Module } from "@nestjs/common";
import { PrismaModule } from "src/config/prisma/prisma.module";
import { CalendarService } from "./calendario.service";
import { CalendarController } from "./calendario.controller";


@Module({
    imports: [PrismaModule],
    providers: [CalendarService],
    controllers: [CalendarController],
    exports: [CalendarService],

})
export class CalendarioModule { }