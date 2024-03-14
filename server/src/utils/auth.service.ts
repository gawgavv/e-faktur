import bcrypt from 'bcryptjs';
import { sign } from 'crypto';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

interface UserPayload {
    id: number
    role: `admin` | `staff`
}

interface MyJWTPayload extends JwtPayload {
    exp: number
}

export class AuthService {

    private JWT_SECRET: string;

    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET || `somerandomstringofchars`;
    }

    async hashPass(plainPass: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(plainPass, salt);
        } catch (error) {
            throw error;
        }
    }

    async checkPass(plainPass: string, hashedPass: string): Promise<boolean> {
        try {
            return await bcrypt.compare(plainPass, hashedPass);
        } catch (error) {
            throw error;
        }
    }

    genToken(payload: UserPayload): string {
        return jsonwebtoken.sign(payload, this.JWT_SECRET, { expiresIn: `8h` });
    }

    verifToken(token: string): UserPayload & MyJWTPayload {

        const payload = jsonwebtoken.verify(token, this.JWT_SECRET)

        if(typeof payload === `string`) throw { name: `Unauthorized`, message: `Invalid token` };

        return payload as UserPayload & MyJWTPayload;
    }
}

export default new AuthService();