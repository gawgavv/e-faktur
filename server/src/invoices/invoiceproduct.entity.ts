import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Invoice } from "./invoices.entity";
import { Product } from "./product.entity";

@Entity({
    name: `InvoiceProducts`
})
export class InvoiceProduct extends BaseEntity {

    @PrimaryGeneratedColumn(`increment`)
    id: number;

    @Column({
        type: `uuid`,
        foreignKeyConstraintName: `InvoiceProductFKOnInvoice`
    })
    invoiceId: string;

    @Column({
        type: `integer`,
        foreignKeyConstraintName: `InvoiceProductFKOnProduct`
    })
    productId: number;

    @Column(`integer`)
    ammount: number;
    
    @ManyToOne(
        () => Invoice,
        (invoice) => invoice.invoiceProduct
    )
    @JoinColumn({
        name: `invoiceId`
    })
    invoice: Invoice;

    @ManyToOne(
        () => Product,
        (product) => product.invoiceProduct
    )
    @JoinColumn({
        name: `productId`
    })
    product: Product;
};