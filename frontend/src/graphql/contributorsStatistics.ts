import { DocumentNode, gql } from "@apollo/client";
import { RepositoryDetails } from "./repositoryDetails";

export type ContributorStats = {
    name: string;
    avatarUrl: string;
    additions: number;
    deletions: number;
};

export const createContributorsStatisticsQuery = (repositoryDetails: RepositoryDetails): DocumentNode => gql`
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
`;