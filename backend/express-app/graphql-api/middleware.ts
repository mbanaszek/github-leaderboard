import { graphqlHTTP } from "express-graphql";
import { GraphQLError } from "graphql";

import { schema } from "./schema";
import { root } from "./resolvers";
import { getErrorCode, getErrorMessage, isCustomErrorName } from "./errors";
import { isNil } from "../../functional/logic";

export const setupGraphQLMiddleware = (): any => {
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
};