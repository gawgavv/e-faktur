import { createClient, RedisClientType } from 'redis';

export class Cache {

    public client;

    public REVOKED_ACC_TOKEN_KEY = `Token/Revoked`;

    constructor() {
        this.client = createClient({
            password: process.env.CACHE_PASS,
            socket: {
                host: process.env.CACHE_HOST,
                port: Number(process.env.CACHE_PORT)
            }
        });
    }
}

export default new Cache()