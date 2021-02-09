import * as express from "express";

import { setupGraphQLMiddleware } from "./graphql-api/middleware";
import * as path from "path";

export const setupAppRoutes = (app: express.Express): express.Express => {

    app.use("/graphql", setupGraphQLMiddleware());



    app.use(express.static(path.join(__dirname, '/../../../frontend/build/')));
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname+'/../../../frontend/build/index.html'));
    });
    return app;
};