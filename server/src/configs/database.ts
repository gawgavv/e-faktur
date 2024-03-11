import { DataSource } from "typeorm";

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
            logging: true
        });
    }

    public getConnection(): Promise<DataSource> {
        return this.dataSource.initialize()
    }
}

export default new DatabaseConnection()