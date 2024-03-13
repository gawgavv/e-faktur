import { BaseEntity, Entity, PrimaryGeneratedColumn,Column, Index, ManyToOne, JoinColumn, OneToMany } from "typeorm";

import { User } from "../users/users.entity";
import { Customer } from "./customer.entity";
import { SalesPerson } from "./salesperson.entity";
import { InvoiceProduct } from "./invoiceproduct.entity";

@Entity({
    name: `Invoices`
})
export class Invoice extends BaseEntity {

    @PrimaryGeneratedColumn(`uuid`)
    id: string;

    @Column({
        type: `uuid`,
        foreignKeyConstraintName: `InvoiceFKOnUser`
    })
    @Index()
    userId: string;

    @Column({
        type: `uuid`,
        foreignKeyConstraintName: `InvoiceFKOnCustomer`
    })
    @Index()
    customerId: string;

    @Column({
        type: `uuid`,
        foreignKeyConstraintName: `InvoiceFKOnSalesPerson`
    })
    @Index()
    salesPersonId: string;

    @Column({
        type: `text`,
        nullable: true
    })
    notes: string;

    @Column(`integer`)
    totalPrice: number;

    @Column({
        type: `boolean`,
        default: false
    })
    paid: boolean;

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

    @ManyToOne(
        () => User,
        (user) => user.invoices
    )
    @JoinColumn({
        name: `userId`
    })
    user: User

    @ManyToOne(
        () => Customer,
        (customer) => customer.invoices
    )
    customer: Customer;

    @ManyToOne(
        () => SalesPerson,
        (salesperson) => salesperson.invoices
    )
    salesPerson: SalesPerson;

    @OneToMany(
        () => InvoiceProduct,
        (invoiceproduct) => invoiceproduct.invoice,
        {
            onDelete: `CASCADE`
        }
    )
    invoiceProduct: InvoiceProduct;
};

