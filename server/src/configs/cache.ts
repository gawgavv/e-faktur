import { createClient, RedisClientType } from 'redis';

class Cache {

    private client;

    public connection: ReturnType<typeof this.client.connect>;

    constructor() {
        this.client = createClient({
            password: process.env.CACHE_PASS,
            socket: {
                host: process.env.CACHE_HOST,
                port: Number(process.env.CACHE_PORT)
            }
        });
    }

    async getConnection(): ReturnType<typeof this.client.connect> {
        if(this.connection) return await this.connection
        return await this.client.connect()
    }
}

export default new Cache()