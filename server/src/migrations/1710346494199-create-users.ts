import { MigrationInterface, QueryRunner } from "typeorm";
import bcrypt from 'bcryptjs';

export class CreateUsers1710346494199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        DROP TYPE IF EXISTS USERROLE;
        `)

        await queryRunner.query(`
        CREATE TYPE USERROLE AS ENUM('admin', 'staff');
        `)

        console.log(`USER ROLE TYPE CREATED...`);

        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "Users"(
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR,
            "email" VARCHAR NOT NULL UNIQUE,
            "password" VARCHAR,
            "role" USERROLE,
            "createdAt" TIMESTAMPTZ DEFAULT NOW(),
            "updatedAt" TIMESTAMPTZ DEFAULT NOW()
        );
        `)

        console.log(`USER TABLE CREATED...`);

        const users: { name: string, email: string, password: string, role: `admin` | `staff` }[] = require(`../../data/users.json`);
        const values = users.map((user) => {
            return `('${user.name}', '${user.email}', '${bcrypt.hashSync(user.password, 10)}', '${user.role}')`
        }).join(`,`);

        await queryRunner.query(`
        INSERT INTO "Users"("name", "email", "password", "role") VALUES${values};
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        DROP TYPE IF EXISTS USERROLE;
        `);

        console.log(`USERS ROLE TYPE DROPPED`)

        await queryRunner.query(`
        DROP TABLE IF EXISTS "Users";
        `);


        console.log(`USERS TABLE DROPPED...`)
    }

}
