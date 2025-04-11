import express from 'express';
import taskRouter from './routes/taskRoutes.ts';
import userRouter from './routes/userRoutes.ts';

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", taskRouter)

app.listen( 3000, () => console.log("Server running"));
