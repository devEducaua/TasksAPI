import type { Response } from "express";
import bcrypt from 'bcryptjs';

export async function isValidPassword(res: Response, password: string, userPassword: any) {
    const valid = await bcrypt.compare(password, userPassword);

    if (!valid) {
        res.status(401).json({ Err: "Incorrect Credentials" });
        return false;
    }
    return true;
}
