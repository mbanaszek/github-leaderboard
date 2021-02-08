import express from "express";
import * as path from "path";
import dotenv from "dotenv";
import * as bodyParser from "body-parser";
import cors from "cors";

import { setupAppRoutes } from "./routes";

dotenv.config({ path: path.join(__dirname, "../.env") });

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

setupAppRoutes(app);