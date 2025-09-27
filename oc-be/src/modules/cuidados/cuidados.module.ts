import { Module } from "@nestjs/common";
import { PrismaModule } from "src/config/prisma/prisma.module";
import { CuidadosService } from "./cuidados.service";
import { CuidadosController } from "./cuidados.controller";

@Module({
    imports: [PrismaModule, CuidadosService],
    providers: [CuidadosService],
    controllers: [CuidadosController],
    exports: [CuidadosService],
})
export class CuidadosModule { }