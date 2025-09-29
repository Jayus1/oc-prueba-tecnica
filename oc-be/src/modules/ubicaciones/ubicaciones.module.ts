import { Module } from '@nestjs/common';
import { UbicacionesController } from './ubicaciones.controller';
import { UbicacionesService } from './ubicaciones.service';
import { PrismaModule } from '../../config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UbicacionesController],
  providers: [UbicacionesService],
  exports: [UbicacionesService]
})
export class UbicacionesModule {}