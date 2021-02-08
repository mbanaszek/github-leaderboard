import {ApolloClient, gql, InMemoryCache} from '@apollo/client';

import {isNil, isNotNil} from "./functional/logic";
import {RepositoryDetails} from "./githubRepositoryURL";

const client = new ApolloClient({
    uri: 'http://localhost:8001/graphql',
    cache: new InMemoryCache()
});

export type ContributorStats = {
    name: string;
    avatarUrl: string;
    additions: number;
    deletions: number;
};

export class RepositoryNotFound extends Error {}
export class CanNotFetchRepositoryStatistics extends Error {}

export const fetchRepositoryContributorsStatistics = async (repositoryDetails: RepositoryDetails): Promise<ContributorStats[]> => {
    const response = await client
        .query({
            query: gql`
                        {
                          contributorsStats(
                            repositoryOwner: "${repositoryDetails.owner}", 
                            repositoryName: "${repositoryDetails.name}"
                            ) {
                                name
                                avatarUrl
                                additions
                                deletions
                            }
                        }
                `
        });

    console.log(response);
    /// TODO: obsłużyć błąd, że repo nie istnieje.
    if (isNotNil(response.errors)) {
        throw new CanNotFetchRepositoryStatistics();
    }

    if (isNil(response.data.contributorsStats)) return [];
    return response.data.contributorsStats;
}