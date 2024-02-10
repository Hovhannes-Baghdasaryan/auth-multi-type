import express from "express";
import {userRouter, authRouter} from "./api/routes/index.ts";
import {HttpException} from "./common/exception";

const app = express();

export const initExpress = () => {
    app.use(express.json());
    app.use("/api/users", userRouter);
    app.use("/api/auth", authRouter);
}

export default app
