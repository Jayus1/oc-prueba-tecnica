import { Module } from '@nestjs/common';
import { EspeciesController } from './especies.controller';
import { EspeciesService } from './especies.service';
import { PrismaModule } from '../../config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EspeciesController],
  providers: [EspeciesService],
  exports: [EspeciesService]
})
export class EspeciesModule {}