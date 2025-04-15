import type { Response } from "express";

export function catchRoute(res: Response, err: Error) {
    res.status(500).json({ 500: "Internal Error"});
    console.log(err);
}
