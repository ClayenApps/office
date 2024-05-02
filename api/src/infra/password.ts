import argon2 from "argon2";
import PasswordService from "../domain/password.js";

export class PasswordServiceArgon2 implements PasswordService {
    async hash(password: string): Promise<string> {
        return await argon2.hash(password);
    }

    async verify(password: string, hash: string): Promise<boolean> {
        return await argon2.verify(hash, password);
    }
}
