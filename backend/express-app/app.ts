import express from "express";
import * as bodyParser from "body-parser";
import { setupAppRoutes } from "./routes";

export let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

setupAppRoutes(app);