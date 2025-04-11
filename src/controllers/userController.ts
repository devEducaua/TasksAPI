import pool from "../models/database.ts";
import bcrypt from 'bcryptjs'
import type { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { catchRoute } from '../middlewares/catchRoutes.ts'
import { isValidPassword } from "../middlewares/validatePassword.ts";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    }

    catch (err) {
        catchRoute(res, err)
    }
}

export const registerUsers =  async (req: Request, res: Response) => {
    const { name, password } = req.body;

    try {
        if (!name || !password ) {
            return;
        }

        const hashed = await bcrypt.hash(password, 10);

        await pool.query("INSERT INTO users (name, password) VALUES ($1 ,$2)", [name, hashed]);

        res.status(201).json({ User: "Created" })
        
    }

    catch (err) {
        catchRoute(res, err)
    }
}

export const loginUsers = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    try {
        const resp = await pool.query("SELECT * FROM users WHERE name = $1", [name]);
        const user = resp.rows[0];

        isValidPassword(res, password, user.password);
        if (!isValidPassword) return;

        const token = jwt.sign({ id: user.id}, process.env.JWT, { expiresIn: "1h"});

        res.json({ "Login Sucessefull": token })

    }

    catch (err) {
        catchRoute(res, err)
    }
}

export const deleteUsers = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, password } = req.body;

    try {
        const resp = await pool.query("SELECT * FROM users WHERE name = $1", [name]);
        const user = resp.rows[0];

        isValidPassword(res, password, user.password);
        if (!isValidPassword) return;

        await pool.query("DELETE FROM users WHERE id = $1", [id]);

        res.json({ User: "Deleted"})
    }

    catch (err) {
        catchRoute(res, err)
    }
}
