import express from "express";
import * as path from "path";
import dotenv from "dotenv";
import * as bodyParser from "body-parser";
import cors from "cors";

import { setupGraphQLMiddleware } from "./graphql-api/middleware";

export const FRONT_APP_END_DIR = process.env.NODE_ENV === "production" ? path.join(__dirname, '/../../../frontend') : path.join(__dirname, '/../../../frontend');

dotenv.config({ path: path.join(__dirname, "../.env") });

export const app = express();

app.use(express.static(path.join(FRONT_APP_END_DIR, '/build/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// Setup routes.
app.use("/graphql", setupGraphQLMiddleware());
app.get('/', (req, res) => {
    res.sendFile(path.join(FRONT_APP_END_DIR, '/build/index.html'));
});