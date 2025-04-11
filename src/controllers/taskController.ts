import pool from '../models/database.ts';
import { catchRoute } from '../middlewares/catchRoutes.ts';
import type { Request, Response } from 'express'

interface authenticateRequest extends Request {
    user?: any
}

export const getTasksByUser = async (req: authenticateRequest, res: Response) => {
    const userId = req.user.id;
    try {
        const tasks = await pool.query("SELECT id, name, state FROM tasks WHERE user_id = $1", [userId]);

        res.json(tasks.rows);
    }

    catch (err) {
        catchRoute(res, err);
    }
}

export const createTask = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { taskName } = req.body

    try {
        if (taskName.trim() == '') return res.json({ Task: "Name not can be null"})

        await pool.query("INSERT INTO tasks (name, user_id) VALUES ($1, $2)", [taskName, userId]);
        res.json({ Task: "Created" })
    }

    catch (err) {
        catchRoute(res, err);
    }
}

export const updateTaskState = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { taskName, taskState } = req.body;

    try {
        const result = await pool.query("UPDATE tasks SET state = $1 WHERE name = $2 AND user_id = $3 RETURNING *", [taskState, taskName, userId]);

        if (result.rows == 0) return res.status(404).json({ Task: "Not Found" })

        res.json({ Task: "Updated", Name: result.rows[0] })
    }

    catch (err) {
        catchRoute(res, err);
    }
}

export const deleteTasks = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { taskName } = req.body;
    
    try {
        const result = await pool.query("DELETE FROM tasks WHERE name = $1 AND user_id = $3 RETURNING *", [taskName, userId])

        if (result.rows == 0) return res.status(404).json({ Task: "Not Found" })

        res.json({ Task: "Deleted", Name: result.rows[0] })
    }

    catch (err) {
        catchRoute(res, err);
    }
}
