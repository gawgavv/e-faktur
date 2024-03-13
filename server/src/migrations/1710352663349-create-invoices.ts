import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvoices1710352663349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `)

        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "Invoices"(
            "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "userId" INT NOT NULL REFERENCES "Users"("id"),
            "customerId" INT NOT NULL REFERENCES "Customers"("id"),
            "salesPersonId" INT NOT NULL REFERENCES "SalesPeople"("id"),
            "notes" TEXT,
            "totalPrice" INT NOT NULL,
            "paid" BOOLEAN NOT NULL DEFAULT FALSE,
            "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        DROP TABLE IF EXISTS "Invoices";
        `);
    }

}
