import { Body, Controller, Get, Logger, NotFoundException, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AgrybaliseCarbonFootPrint } from "./agrybaliseCarbonFootPrint.entity";
import { AgrybaliseCarbonFootPrintService } from "./agrybaliseCarbonFootPrint.service";
import { CreateAgrybalyiseCarbonFootPrintDto } from "./dto/create-carbonFootPrintProduct.dto";

@Controller("agrybalise-carbon-fp")
export class AgrybaliseCarbonFootPrintController {
    constructor(
        private readonly agrybaliseCarbonFootPrintService: AgrybaliseCarbonFootPrintService
    ) { }

    @Get(':food')
    async getAgrybaliseCarbonFootPrint(@Param('food') food: string): Promise<number | string | null> {
        Logger.log(
            `[agrybalise-carbon-fp] [GET] AgrybaliseCarbonFootPrint: getting one specific AgrybaliseCarbonFootPrint`
        );
        const agrybaliseCarbonFP: AgrybaliseCarbonFootPrint | null = await this.agrybaliseCarbonFootPrintService.findOne(food);
        if (agrybaliseCarbonFP) {
            return agrybaliseCarbonFP.carbonFootPrint
        }
        else {
            throw new NotFoundException("We doesn't have this recipe in our current Database.")
        }

    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createAgrybaliseCarbonFootPrint(
        @Body() params: CreateAgrybalyiseCarbonFootPrintDto
    ): Promise<AgrybaliseCarbonFootPrint | null> {
        ``;
        Logger.log(
            `[agrybalise-carbon-fp"] [POST] AgrybaliseCarbonFootPrint: ${AgrybaliseCarbonFootPrint} created`
        );
        const agrybaliseCarbonFP: AgrybaliseCarbonFootPrint | null = await this.agrybaliseCarbonFootPrintService.findOne(params.name);

        if (agrybaliseCarbonFP) {
            throw new NotFoundException("This recipe already exists in our database.")
        }
        else {
            return this.agrybaliseCarbonFootPrintService.create(params);
        }
    }
}
