import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import resevationrouter from "./routes/resevationroutes.js";
// import path from "path";

const app = express();
dotenv.config({ path: "./config/config.env" });

// Remove the frontendURL and credentials option
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/app/v1/resevation", resevationrouter);
// --------------------deyployment --------------------
// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "/frontend/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("Api is Running");
//   });
// }
// // --------------------deyployment --------------------
dbConnection();
app.use(errorMiddleware);

export default app;
