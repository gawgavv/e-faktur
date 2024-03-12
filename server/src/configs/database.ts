import { DataSource } from "typeorm";
import { User } from "../users/users.entity";
import { Invoice } from "../invoices/invoices.entity";
import { Product } from "../invoices/product.entity";
import { InvoiceProduct } from "../invoices/invoiceproduct.entity";
import { Customer } from "../invoices/customer.entity";
import { SalesPerson } from "../invoices/salesperson.entity";

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
            logging: true,
            synchronize: true
        });
    }

    public getConnection(): Promise<DataSource> {
        return this.dataSource.initialize()
    }
}

export default new DatabaseConnection()