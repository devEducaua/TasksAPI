import express from 'express'
import { deleteUsers, getUsers, loginUsers, registerUsers } from '../controllers/userController.ts';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/register', registerUsers);
userRouter.post('/login', loginUsers);
userRouter.delete('/:id', deleteUsers);

export default userRouter;
