import * as express from "express";

import { setupGraphQLMiddleware } from "./graphql-api/middleware";

export const setupAppRoutes = (app: express.Express): express.Express => {

    app.use('/graphql', setupGraphQLMiddleware());

    // app.use("*", (_request: express.Request, response: express.Response, _next: NextFunction) => {
    //     response.status(404).json("Noot found");
    // });

    return app;
}