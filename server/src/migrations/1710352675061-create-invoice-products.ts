import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvoiceProducts1710352675061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "InvoiceProducts"(
            "id" SERIAL PRIMARY KEY,
            "invoiceId" UUID NOT NULL REFERENCES "Invoices"("id"),
            "productId" INT NOT NULL REFERENCES "Products"("id"),
            "ammount" INT NOT NULL CHECK("ammount" >= 0)
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        DROP TABLE IF EXISTS "InvoiceProducts";
        `);
    }

}
