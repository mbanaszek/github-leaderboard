import * as express from "express";

import { setupGraphQLMiddleware } from "./graphql-api/middleware";

export const setupAppRoutes = (app: express.Express): express.Express => {

    app.use("/graphql", setupGraphQLMiddleware());

    return app;
};