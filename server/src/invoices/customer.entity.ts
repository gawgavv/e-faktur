import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Invoice } from "./invoices.entity";

@Entity({
    name: `Entities`
})
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn(`uuid`)
    id: string;

    @Column(`varchar`)
    customerName: string;

    @OneToMany(
        () => Invoice,
        (invoice) => invoice.customer,
        {
            onDelete: `CASCADE`
        }
    )
    invoices: Invoice[]
};