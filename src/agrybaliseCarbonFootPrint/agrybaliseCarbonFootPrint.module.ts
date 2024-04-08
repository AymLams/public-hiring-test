import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarbonEmissionFactor } from "../carbonEmissionFactor/carbonEmissionFactor.entity";
import { AgrybaliseCarbonFootPrint } from "./agrybaliseCarbonFootPrint.entity";
import { AgrybaliseCarbonFootPrintService } from "./agrybaliseCarbonFootPrint.service";
import { AgrybaliseCarbonFootPrintController } from "./agrybaliseCarboonFootPrint.controller";

@Module({
    imports: [TypeOrmModule.forFeature([AgrybaliseCarbonFootPrint, CarbonEmissionFactor])],
    providers: [AgrybaliseCarbonFootPrintService],
    controllers: [AgrybaliseCarbonFootPrintController],
})
export class AgrybaliseCarbonFootPrintModule { }
