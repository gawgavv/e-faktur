import express, { Application } from 'express';

class Server {

    public app: Application;
    private PORT: number | string;

    constructor() {
        this.PORT = process.env.PORT || 3000;
        this.app = express();
    }

    public start() {
        this.app.get(`/`, (req, res) => res.send(`Hello World`))
        this.app.listen(this.PORT, () => console.log(`Server is listening on port ${this.PORT}`));
    }
}

export default new Server();