import {graphqlHTTP} from "express-graphql";
import {GraphQLError} from "graphql";

import {schema} from "./schema";
import {root} from "./resolvers";
import {getErrorCode, getErrorMessage, isCustomErrorName} from "./errors";
import {isNil} from "../../functional/logic";

export const setupGraphQLMiddleware = () => {
    if (isNil(process.env.GITHUB_AUTHENTICATION_TOKEN)) {
        throw new Error("You need to setup GITHUB_AUTHENTICATION_TOKEN env variable.")
    }

    return graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
        customFormatErrorFn: (error: GraphQLError): any => {
            const errorName = error.message;

            if (isCustomErrorName(errorName)) {
                return ({
                    errorName: errorName,
                    statusCode: getErrorCode(errorName),
                    message: getErrorMessage(errorName),
                });
            }

            return error;
        }
    });
}