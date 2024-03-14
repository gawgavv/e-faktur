import { createClient } from 'redis';
import dotenv from 'dotenv';

export class Cache {

    private client;

    public connection: ReturnType<typeof this.client.connect>;
    public REVOKED_ACC_TOKEN_KEY = `Token/Revoked`;

    constructor() {
        dotenv.config();
        this.client = createClient({
            password: process.env.CACHE_PASS,
            socket: {
                host: process.env.CACHE_HOST,
                port: Number(process.env.CACHE_PORT)
            }
        });
    }

    public async getConnection(): Promise<ReturnType<typeof this.client.connect>> {
        if(this.connection) return this.connection;
        return await this.client.connect()
    }
}

export default new Cache()