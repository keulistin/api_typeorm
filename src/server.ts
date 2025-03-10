import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./_helpers/db";
import userRoutes from "./users/users.controller";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => console.error("Database connection error:", error));

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
