import express, { Application } from 'express';

class Server {

    public app: Application;
    private PORT: number | string;

    constructor() {
        // Server configurations
        this.app = express();
        this.PORT = process.env.PORT || 3000;

        // Server's requests' body parsers
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    // Server bootstrap method
    public start() {
        this.app.get(`/`, (req, res) => res.send(`Hello World`));
        this.app.listen(this.PORT, () => console.log(`Server is listening on port ${this.PORT}`));
    }
}

import dotenv from 'dotenv';
dotenv.config()
export default new Server();