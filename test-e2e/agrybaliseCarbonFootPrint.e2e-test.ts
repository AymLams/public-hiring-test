import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { dataSource } from "../config/dataSource";
import { AppModule } from "../src/app.module";
import { CarbonEmissionFactor } from "../src/carbonEmissionFactor/carbonEmissionFactor.entity";
import { getTestEmissionFactor } from "../src/seed-dev-data";

beforeAll(async () => {
    await dataSource.initialize();
});

afterAll(async () => {
    await dataSource.destroy();
});

describe("AgrybaliseCarbonFootPrint", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        await dataSource
            .getRepository(CarbonEmissionFactor)
            .save([getTestEmissionFactor("ham"), getTestEmissionFactor("beef")]);
    });


    it("GET /agrybalise-carbon-fp", async () => {
        return request(app.getHttpServer())
            .get("/agrybalise-carbon-fp/HamBeef")
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual({});
            });
    });

    it("POST /agrybalise-carbon-fp", async () => {
        const carbonEmissionFactorArgs = {
            name: "HamBeef",
            recipe: [
                { name: "ham", quantity: 0.1, unit: "kg" },
                { name: "beef", quantity: 0.2, unit: "kg" }
            ]
        };
        return request(app.getHttpServer())
            .post("/agrybalise-carbon-fp")
            .send(carbonEmissionFactorArgs)
            .expect(201)
            .expect(({ body }) => {
                expect(body.carbonFootPrint).toEqual(2.811);
                expect(body.name).toEqual("HamBeef")
            });
    });


    it("GET /agrybalise-carbon-fp", async () => {
        return request(app.getHttpServer())
            .get("/agrybalise-carbon-fp/HamBeef")
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual(2.811);
            });
    });
});
