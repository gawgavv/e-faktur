import { NextFunction, Request, Response } from "express";

class ErrorController {

    public errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
        
        let statusCode: number;
        let message = err.message

        switch(err.name) {

            case `EmptyFieldSignIn`:
                statusCode = 400;
                break;
            
            case `Unauthorized`:
                statusCode = 401;
                break;
                
            default:
                statusCode = 500;
                message = `Internal Server Error`;
        }

        res.status(statusCode).json({ message });
    }
}

export default new ErrorController();