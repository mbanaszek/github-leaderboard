import express from "express";
import * as path from "path";
import dotenv from "dotenv";
import * as bodyParser from "body-parser";
import cors from "cors";

import { setupGraphQLMiddleware } from "./graphql-api/middleware";

export const FRONTEND_BUILD_DIR = process.env.NODE_ENV === "production"
    ? '/app/frontend/build'
    : path.join(__dirname, '../../frontend/build');

dotenv.config({ path: path.join(__dirname, "../.env") });

export const app = express();

app.use(express.static(FRONTEND_BUILD_DIR));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// Setup routes.
app.use("/graphql", setupGraphQLMiddleware());
app.get('/', (req, res) => {
    res.sendFile(path.join(FRONTEND_BUILD_DIR, '/index.html'));
});