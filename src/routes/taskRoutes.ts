import express from 'express'
import { authenticateToken } from '../middlewares/authenticateToken.ts'
import { createTask, deleteTasks, getTasksByUser, updateTaskState } from '../controllers/taskController.ts'

const taskRouter = express.Router();

taskRouter.get('/', authenticateToken, getTasksByUser);
taskRouter.post('/', authenticateToken, createTask);
taskRouter.patch('/', authenticateToken, updateTaskState);
taskRouter.delete('/', authenticateToken, deleteTasks);

export default taskRouter;
