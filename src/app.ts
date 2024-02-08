import express from "express";
import {userRouter, authRouter} from "./api/routes/index.ts";

const app = express();

export const initExpress = () => {
    app.use(express.json());
    app.use("/api/user", userRouter);
    app.use("/api/auth", authRouter);
}

export default app
