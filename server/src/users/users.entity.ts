import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, BeforeInsert } from "typeorm";

import authService from "../utils/auth.service";

import { Invoice } from "../invoices/invoices.entity";

@Entity({
    name: `Users`
})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn(`increment`)
    id: number;

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
    role: `admin` | `staff`;

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
            const hashedPass = await authService.hashPass(this.password);
            this.password = hashedPass;
        } catch (error) {
            throw error;
        }
    }
};