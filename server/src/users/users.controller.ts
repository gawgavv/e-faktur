import { NextFunction, Request, Response, Router } from 'express';

import { UserService } from './users.service';

export class UserController {

    public router: Router;

    private readonly userService: UserService;

    constructor(
        userService: UserService
    ) {
        this.userService = userService;
        this.router = Router();
        this.router.route(`/auth/sign-in`).post(this.signInRequestHandler);
        this.router.route(`/auth/sign-out`).post(this.signOutRequestHandler);
        this.router.route(`/users`).post(this.signUp);
    }

    private async signInRequestHandler(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: { email: string, password: string } = req.body;
            if(!email) throw { name: `EmptyFieldSignIn`, message: `Email is required` };
            if(!password) throw { name: `EmptyFieldSignIn`, message: `Password is required` };

            const { accessToken, name } = await this.userService.signIn(email, password);

            res.json({ accessToken, name });
        } catch (error) {
            next(error)
        }
    }

    private async signOutRequestHandler(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {
        }
    }

    private async signUp(req: Request, res: Response) {
        try {
        } catch (error) {
        }
    }
}

export default new UserController(new UserService());

