import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProducts1710352590443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "Products"(
            "id" SERIAL PRIMARY KEY,
            "productName" VARCHAR NOT NULL,
            "stocks" INT NOT NULL CHECK("stocks" >= 0),
            "price" INT NOT NULL CHECK("price" >= 0),
            "productPic" VARCHAR NOT NULL
        );
        `);

        const products: { productName: string, stock: number, price: number, productPic: string }[] = require(`../../data/products.json`);
        const values = products.map((product) => {
            return `('${product.productName}', '${product.stock}', '${product.price}', '${product.productPic}')`
        }).join(`,`);
        await queryRunner.query(`
        INSERT INTO "Products"("productName", "stocks", "price", "productPic") VALUES${values};
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS "Products";
        `);
    }

}
