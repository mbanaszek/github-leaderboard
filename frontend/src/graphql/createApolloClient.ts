import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

const graphqlAPIURL = process.env.GRAPHQL_API_URL || "http://localhost:8001/graphql";

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
        link: new HttpLink({ uri: graphqlAPIURL }),
        cache: new InMemoryCache(),
    });
};