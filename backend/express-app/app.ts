import express from "express";
import * as bodyParser from "body-parser";
import { setupAppRoutes } from "./routes";

export let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

setupAppRoutes(app);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    next(err);
});