import express, { Application, Router } from 'express';

import invoiceController from './invoices/invoices.controller'
import userController from './users/users.controller';

import errorController from './utils/error.controller';

class Server {

    public app: Application;
    private PORT: number | string;

    private routers: Router[];

    constructor(routers: Router[]) {
        // Server configurations
        this.app = express();
        this.PORT = process.env.PORT || 3000;

        // Server's requests' body parsers
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Static files path (images, etc)
        this.app.use(express.static(`public`));

        // Routers configurations
        this.routers = routers;
        this.app.use(this.routers);

        // Error Handler
        this.app.use(errorController.errorHandler);
    }

    // Server bootstrap method
    public start() {
        this.app.get(`/`, (req, res) => res.send(`Hello World`));
        this.app.listen(+this.PORT, () => console.log(`Server is listening on port ${this.PORT}`));
    }
}

import dotenv from 'dotenv';
dotenv.config();
export default new Server([invoiceController.router, userController.router]);