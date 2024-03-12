import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";

import bcrypt from 'bcryptjs';

import { Invoice } from "../invoices/invoices.entity";

@Entity({
    name: `Users`
})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn(`uuid`)
    id: string;

    @Column(`varchar`)
    name: string;

    @Column({
        type: `varchar`,
        unique: true
    })
    @Index()
    email: string;

    @Column({
        type: `varchar`,
        nullable: true
    })
    password: string;

    @Column({
        type: `enum`,
        enum: [`admin`, `staff`]
    })
    role: string;

    @Column({
        type: `timestamptz`,
        default: () => `NOW()`
    })
    createdAt: Date;

    @Column({
        type: `timestamptz`,
        default: () => `NOW()`
    })
    updatedAt: Date;

    @OneToMany(
        () => Invoice,
        (invoice) => invoice.user,
        {
            onDelete: `CASCADE`
        }
    )
    invoices: Invoice[]

    @BeforeInsert()
    async hashPassword() {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(this.password, salt);
            this.password = hashedPass;
        } catch (error) {
            throw error;
        }
    }
};