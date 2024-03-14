import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomers1710352612914 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "Customers"(
            "id" SERIAL PRIMARY KEY,
            "customerName" VARCHAR NOT NULL
        );
        `);

        const customers: { customerName: string }[] = require(`../../data/customers.json`);
        const values = customers.map((customer) => {
            return `('${customer.customerName}')`
        });

        await queryRunner.query(`
        INSERT INTO "Customers"("customerName") VALUES${values};
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS "Customers";
        `);
    }

}
