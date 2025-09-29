import { Module } from '@nestjs/common';

import { PrismaModule } from '../src/config/prisma/prisma.module';
import { PlantasModule } from './modules/plantas/plantas.module';
import { PlantasController } from './modules/plantas/plantas.controller';
import { CuidadosModule } from './modules/cuidados/cuidados.module';
import { CuidadosController } from './modules/cuidados/cuidados.controller';
import { CalendarioModule } from './modules/calendar/calendario.module';
import { CalendarController } from './modules/calendar/calendario.controller';
import { UbicacionesModule } from './modules/ubicaciones/ubicaciones.module';
import { UbicacionesController } from './modules/ubicaciones/ubicaciones.controller';
import { EspeciesModule } from './modules/especies/especies.module';
import { EspeciesController } from './modules/especies/especies.controller';

@Module({
  imports: [PrismaModule, PlantasModule, CuidadosModule, CalendarioModule, UbicacionesModule, EspeciesModule],
  controllers: [PlantasController, CuidadosController, CalendarController, UbicacionesController, EspeciesController],
})
export class AppModule { }
