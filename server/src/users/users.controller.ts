import { Router } from 'express';

import { UserService } from './users.service';

export class UserController {

    public router: Router;

    private readonly userService: UserService;

    constructor(
        userService: UserService
    ) {
        this.userService = userService;
        this.router = Router();
        this.router.route(`users`);
        this.router.route(`auth`);
    }
}

export default new UserController(new UserService());

