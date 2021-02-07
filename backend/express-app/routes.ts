import * as express from "express";
import { NextFunction } from "express";
import {schema} from "../graphql/schema";
import {graphqlHTTP} from "express-graphql";
import {root} from "../graphql/resolvers";

export const setupAppRoutes = (app: express.Express): express.Express => {

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));

    // app.use("*", (_request: express.Request, response: express.Response, _next: NextFunction) => {
    //     response.status(404).json("Noot found");
    // });

    return app;
}