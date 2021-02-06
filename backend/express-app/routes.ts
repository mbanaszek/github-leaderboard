import * as express from "express";
import { NextFunction } from "express";

export const setupAppRoutes = (app: express.Express): express.Express => {

    app.get('/graphql-api', (_request: express.Request, response: express.Response, _next: NextFunction) => {
        response.send("Tu będzie API.");
    });

    app.use("*", (_request: express.Request, response: express.Response, _next: NextFunction) => {
        response.send("Tu będzie 404.");
    });

    return app;
}