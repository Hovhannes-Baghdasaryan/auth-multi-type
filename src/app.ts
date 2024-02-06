import express from "express";
import {userRouter} from "./api/routes/index.ts";

const app = express();

export const initExpress = () => {
    app.use(express.json());
    app.use("/api/user", userRouter);
}

export default app
