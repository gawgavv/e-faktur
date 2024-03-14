import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Invoice } from "./invoices.entity";

@Entity({
    name: `Customers`
})
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn(`increment`)
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