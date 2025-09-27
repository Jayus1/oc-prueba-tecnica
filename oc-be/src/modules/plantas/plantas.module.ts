import { Module } from "@nestjs/common";
import { PrismaModule } from "src/config/prisma/prisma.module";
import { PlantasService } from "./plantas.service";
import { PlantasController } from "./plantas.controller";

@Module({
    imports: [PrismaModule],
    providers: [PlantasService],
    controllers: [PlantasController],
    exports: [PlantasService],

})
export class PlantasModule { }