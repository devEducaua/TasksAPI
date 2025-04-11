import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

interface authenticateRequest extends Request {
    user?: any
}

export function authenticateToken(req: authenticateRequest, res: Response, next: NextFunction) {
    const header = req.headers["authorization"];
    console.log(header)

    const token = header?.split(" ")[1];
    console.log(token)

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT, (err: Error, user: any) => {
        if (err) return res.sendStatus(403);

        req.user = user;

        next();
    })
}
