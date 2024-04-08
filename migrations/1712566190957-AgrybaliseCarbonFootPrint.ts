import { MigrationInterface, QueryRunner } from "typeorm";

export class AgrybaliseCarbonFootPrint1712566190957 implements MigrationInterface {
    name = 'AgrybaliseCarbonFootPrint1712566190957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agrybalise_carbon_foot_print" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "carbonFootPrint" double precision, "recipe" json NOT NULL, CONSTRAINT "PK_0622125686265d47555883201bb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "agrybalise_carbon_foot_print"`);
    }

}
