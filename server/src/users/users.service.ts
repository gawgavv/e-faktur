import { User } from "./users.entity";

import { AuthService } from "../utils/auth.service";
import cache from "../configs/cache";

export class UserService {

    private readonly authService;

    constructor(
        authService: AuthService
    ) {
        this.authService = authService;
    }

    async signIn(email: string, password: string): Promise<{ accessToken: string, name: string }> {

        const user = await User.findOne({
            select: [`id`, `name`, `password`,`role`],
            where: {
                email
            }
        });

        const authError: Error = { name: `Unauthorized`, message: `Invalid Email/Password` };
        if(!user) throw authError;
        const { id, name, password: hashedPass, role } = user;
        if(!await this.authService.checkPass(password, hashedPass)) throw authError;

        const accessToken = this.authService.genToken({ id, role });
        return { accessToken, name }
    }

    async signOut(accessToken: string): Promise<true> {

        const { id, exp } = this.authService.verifToken(accessToken);

        const user = await User.findOne({
            select: [`id`],
            where: {
                id
            }
        });

        if(!user) throw { name: `Unauthorized`, message: `Invalid token` };

        await cache.client.zAdd(cache.REVOKED_ACC_TOKEN_KEY, [{ score: exp, value: accessToken }]);
        
        return true
    }

    async createUser() {
    }
}