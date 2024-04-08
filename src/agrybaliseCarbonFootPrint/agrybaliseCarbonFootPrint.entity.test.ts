import { GreenlyDataSource, dataSource } from "../../config/dataSource";
import { AgrybaliseCarbonFootPrint } from "./agrybaliseCarbonFootPrint.entity";

let agrybaliseFP: AgrybaliseCarbonFootPrint;

beforeAll(async () => {
    await dataSource.initialize();
    agrybaliseFP = new AgrybaliseCarbonFootPrint({
        name: "HamCheese",
        recipe: [
            { name: "ham", quantity: 0.1, unit: "kg" },
            { name: "cheese", quantity: 0.15, unit: "kg" }
        ],
    });
});

beforeEach(async () => {
    await GreenlyDataSource.cleanDatabase();
});

describe("AgrybaliseCarbonFootPrintEntity", () => {
    describe("constructor", () => {
        it("should create a Agrybalise Carbon Foot Print element", () => {
            expect(agrybaliseFP.name).toBe("HamCheese");
        });
    });
});

afterAll(async () => {
    await dataSource.destroy();
});