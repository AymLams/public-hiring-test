import { GreenlyDataSource, dataSource } from "../../config/dataSource";
import { CarbonEmissionFactor } from "../carbonEmissionFactor/carbonEmissionFactor.entity";
import { AgrybaliseCarbonFootPrint } from "./agrybaliseCarbonFootPrint.entity";
import { AgrybaliseCarbonFootPrintService } from "./agrybaliseCarbonFootPrint.service";


let agrybaliseCFPService: AgrybaliseCarbonFootPrintService;

let recipeName = "HamCheese";
let carbonFootprintValue = 0.029;
let recipe = [
    { name: "ham", quantity: 0.1, unit: "kg" },
    { name: "cheese", quantity: 0.15, unit: "kg" }
]

beforeAll(async () => {
    await dataSource.initialize();
    agrybaliseCFPService = new AgrybaliseCarbonFootPrintService(
        dataSource.getRepository(AgrybaliseCarbonFootPrint),
        dataSource.getRepository(CarbonEmissionFactor)
    );
});

beforeEach(async () => {
    await GreenlyDataSource.cleanDatabase();
    await dataSource
        .getRepository(AgrybaliseCarbonFootPrint)
    await dataSource
        .getRepository(CarbonEmissionFactor).save([{ name: "ham", unit: "kg", emissionCO2eInKgPerUnit: 0.11, source: "Agrybalise" },
        { name: "cheese", unit: "kg", emissionCO2eInKgPerUnit: 0.12, source: "Agrybalise" }
        ])
});

describe("AgrybaliseCarbonFootPrintService", () => {
    it("Should calculate Agrybalise Carbon Footprint", async () => {
        const value = await agrybaliseCFPService.computeAgrybaliseCarbonFootPrint(recipe)
        expect(value).toStrictEqual(carbonFootprintValue);
    });
    it("Should save a specific Agrybalise Carbon Footprint", async () => {
        await dataSource.getRepository(AgrybaliseCarbonFootPrint)
            .save(
                {
                    "name": recipeName,
                    "recipe": recipe,
                    "carbonFootPrint": carbonFootprintValue
                }
            );
        const retrieveCFP = await dataSource
            .getRepository(AgrybaliseCarbonFootPrint)
            .findOne({ where: { name: recipeName } });
        expect(retrieveCFP?.name).toBe(recipeName);
    })
    it("Should give back the specific Agrybalise Carbon Footprint we juste compute before", async () => {
        await dataSource.getRepository(AgrybaliseCarbonFootPrint)
            .save(
                {
                    "name": recipeName,
                    "recipe": recipe,
                    "carbonFootPrint": carbonFootprintValue
                }
            );
        const retrieveAgrybaliseCFP = await agrybaliseCFPService.findOne(recipeName);
        expect(retrieveAgrybaliseCFP?.carbonFootPrint).toStrictEqual(carbonFootprintValue);
        expect(retrieveAgrybaliseCFP?.name).toStrictEqual(recipeName);
    });
});

afterAll(async () => {
    await dataSource.destroy();
});