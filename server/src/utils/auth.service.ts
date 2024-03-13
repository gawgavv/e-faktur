import bcrypt from 'bcryptjs';
import { sign } from 'crypto';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

interface UserPayload {
    id: string
    role: `admin` | `staff`
}

class HashService {

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

    verifToken(token: string): JwtPayload & UserPayload {

        const payload = jsonwebtoken.verify(token, this.JWT_SECRET)

        if(typeof payload === `string`) throw { name: `Unauthorized`, message: `Invalid token` };

        return payload as JwtPayload & UserPayload;
    }
}

export default new HashService();