import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSalesPeople1710352648038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "SalesPeople"(
            "id" SERIAL PRIMARY KEY,
            "salesPersonName" VARCHAR NOT NULL
        );
        `);

        const salesPeople: { salesPersonName: string }[] = require(`../../data/salespeople.json`);
        const values = salesPeople.map((salesPerson) => {
            return `('${salesPerson.salesPersonName}')`
        });

        await queryRunner.query(`
        INSERT INTO "SalesPeople"("salesPersonName") VALUES${values};
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS "SalesPeople";
        `);
    }

}
