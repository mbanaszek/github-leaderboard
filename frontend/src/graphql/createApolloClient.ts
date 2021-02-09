import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

const graphqlAPIURL = process.env.NODE_ENV === "production" ? "https://boiling-fjord-26962.herokuapp.com/graphql" : "http://localhost:8001/graphql";

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
        link: new HttpLink({ uri: graphqlAPIURL }),
        cache: new InMemoryCache(),
    });
};