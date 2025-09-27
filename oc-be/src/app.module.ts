import { Module } from '@nestjs/common';

import { PrismaModule } from '../src/config/prisma/prisma.module';
import { PlantasModule } from './modules/plantas/plantas.module';
import { PlantasController } from './modules/plantas/plantas.controller';
import { CuidadosModule } from './modules/cuidados/cuidados.module';
import { CuidadosController } from './modules/cuidados/cuidados.controller';
import { CalendarioModule } from './modules/calendar/calendario.module';
import { CalendarController } from './modules/calendar/calendario.controller';

@Module({
  imports: [PrismaModule, PlantasModule, CuidadosModule, CalendarioModule],
  controllers: [PlantasController, CuidadosController, CalendarController],
})
export class AppModule { }
