import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InvoiceProduct } from "./invoiceproduct.entity";

@Entity({
    name: `Products`
})
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn(`increment`)
    id: number;

    @Column(`varchar`)
    productName: string;

    @Column(`integer`)
    stocks: number;

    @Column(`integer`)
    price: number;

    @Column(`varchar`)
    productPic: string;

    @OneToMany(
        () => InvoiceProduct,
        (invoiceproduct) => invoiceproduct.invoice,
        {
            onDelete: `CASCADE`
        }
    )
    invoiceProduct: InvoiceProduct;
}