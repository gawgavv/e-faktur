import { DataSource } from "typeorm";

import { User } from "../users/users.entity";
import { Invoice } from "../invoices/invoices.entity";
import { Product } from "../invoices/product.entity";
import { InvoiceProduct } from "../invoices/invoiceproduct.entity";
import { Customer } from "../invoices/customer.entity";
import { SalesPerson } from "../invoices/salesperson.entity";

import { CreateUsers1710346494199 } from "../migrations/1710346494199-create-users";
import { CreateProducts1710352590443 } from "../migrations/1710352590443-create-products";
import { CreateCustomers1710352612914 } from "../migrations/1710352612914-create-customers";
import { CreateSalesPeople1710352648038 } from "../migrations/1710352648038-create-sales-people";
import { CreateInvoices1710352663349 } from "../migrations/1710352663349-create-invoices";
import { CreateInvoiceProducts1710352675061 } from "../migrations/1710352675061-create-invoice-products";

class DatabaseConnection {

    public dataSource: DataSource;

    constructor() {
        this.dataSource = new DataSource({
            type: `postgres`,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT) || 3001,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: [
                User,
                Invoice,
                Product,
                InvoiceProduct,
                Customer,
                SalesPerson
            ],
            migrations: [
                CreateUsers1710346494199,
                CreateProducts1710352590443,
                CreateCustomers1710352612914,
                CreateSalesPeople1710352648038,
                CreateInvoices1710352663349,
                CreateInvoiceProducts1710352675061
            ],
            migrationsRun: true,
            logging: true
        });
    }

    public getConnection(): Promise<DataSource> {
        return this.dataSource.initialize()
    }
}

export default new DatabaseConnection()