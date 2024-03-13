import { NextFunction, Request, Response, Router } from 'express';

import { UserService } from './users.service';
import { AuthService } from '../utils/auth.service';

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

    private signInRequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password }: { email?: string, password?: string } = req.body;
            if(!email) throw { name: `BadRequest`, message: `Email is required` };
            if(!password) throw { name: `BadRequest`, message: `Password is required` };

            const { accessToken, name } = await this.userService.signIn(email, password);

            res.json({ accessToken, name });
        } catch (error) {
            next(error)
        }
    }

    private signOutRequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { accessToken }: { accessToken?: string } = req.body
            if(!accessToken) throw { name: `BadRequest`, message: `Please provide your access token` };

            const success: true = await this.userService.signOut(accessToken);

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    private async signUp(req: Request, res: Response) {
        try {
        } catch (error) {
        }
    }
}

export default new UserController(new UserService(new AuthService()));

