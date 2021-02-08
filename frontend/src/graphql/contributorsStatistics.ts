import {gql} from '@apollo/client';
import {Maybe} from "../functional/maybe";
import {isNil} from "../functional/logic";
const parseGithubURL = require('parse-github-url');

export type ContributorStats = {
    name: string;
    avatarUrl: string;
    additions: number;
    deletions: number;
};

export type RepositoryDetails = {
    owner: string;
    name: string;
}

export const getRepositoryDetails = (githubURL: string): Maybe<RepositoryDetails> => {

    const parsedGithubURL = parseGithubURL(githubURL);
    console.log(parsedGithubURL);

    if (isNil(parsedGithubURL) || isNil(parsedGithubURL.repository)) return null;

    const repositoryFullNameSplit = parsedGithubURL.repository.split('/');
    if (repositoryFullNameSplit.length !== 2) return null;

    return {
        owner: repositoryFullNameSplit[0],
        name: repositoryFullNameSplit[1]
    };
}

export const createContributorsStatisticsQuery = (repositoryDetails: RepositoryDetails): any => gql`
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