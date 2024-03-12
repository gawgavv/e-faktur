import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./invoices.entity";

@Entity({
    name: `SalesPeople`
})
export class SalesPerson extends BaseEntity {

    @PrimaryGeneratedColumn(`uuid`)
    id: string;

    @Column(`varchar`)
    salesPersonName: string;

    @OneToMany(
        () => Invoice,
        (invoice) => invoice.salesPersonId,
        {
            onDelete: `CASCADE`
        }
    )
    invoices: Invoice[];
};