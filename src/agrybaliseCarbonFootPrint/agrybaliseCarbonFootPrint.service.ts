import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CarbonEmissionFactor } from "../carbonEmissionFactor/carbonEmissionFactor.entity";
import { AgrybaliseCarbonFootPrint } from "./agrybaliseCarbonFootPrint.entity";
import { CreateAgrybalyiseCarbonFootPrintDto, IngredientDto } from "./dto/create-carbonFootPrintProduct.dto";

@Injectable()
export class AgrybaliseCarbonFootPrintService {
    constructor(
        @InjectRepository(AgrybaliseCarbonFootPrint)
        private agrybaliseCarbonFootPrintRepository: Repository<AgrybaliseCarbonFootPrint>,
        @InjectRepository(CarbonEmissionFactor)
        private carbonEmissionFactorRepository: Repository<CarbonEmissionFactor>
    ) { }

    async findOne(foodProduct: string): Promise<AgrybaliseCarbonFootPrint | null> {
        return this.agrybaliseCarbonFootPrintRepository.findOne({ where: { "name": foodProduct } });
    }

    async create(
        agrybaliseCarbonFootPrint: CreateAgrybalyiseCarbonFootPrintDto
    ): Promise<AgrybaliseCarbonFootPrint> {
        const carbonFP: AgrybaliseCarbonFootPrint = new AgrybaliseCarbonFootPrint(agrybaliseCarbonFootPrint);
        carbonFP.carbonFootPrint = await this.computeAgrybaliseCarbonFootPrint(carbonFP.recipe);
        return this.agrybaliseCarbonFootPrintRepository.save(carbonFP);
    }

    async computeAgrybaliseCarbonFootPrint(recipe: IngredientDto[]): Promise<number | null> {
        let agrybaliseCFP: number = 0
        for (let i = 0; i < recipe.length; i++) {
            const carbonEmissionFactor: CarbonEmissionFactor | null = await this.carbonEmissionFactorRepository.findOneBy({ "name": recipe[i]["name"] })
            if (carbonEmissionFactor) {
                agrybaliseCFP += carbonEmissionFactor.emissionCO2eInKgPerUnit * recipe[i].quantity
            }
            else {
                return null
            }
        }

        return parseFloat(agrybaliseCFP.toFixed(3))
    }
}
