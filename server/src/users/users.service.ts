import { User } from "./users.entity";

import authService from "../utils/auth.service";

export class UserService {

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
        if(!await authService.checkPass(password, hashedPass)) throw authError;

        const accessToken = authService.genToken({ id, role });
        return { accessToken, name }
    }

    async signOut() {
    }

    async createUser() {
    }
}