import express from "express";
import authRouter from "./routes/authRouter.js";
import activitiesRouter from "./routes/activitiesRouter.js";
import "./db/index.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5050;

app.use("/activities", activitiesRouter);
app.use("/auth", authRouter);
app.use("*", (req, res) => res.sendStatus(404));
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
