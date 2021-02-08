import {Maybe} from "./functional/maybe";
import {isNil} from "./functional/logic";

const parseGithubURL = require('parse-github-url');

export type RepositoryDetails = {
    owner: string;
    name: string;
}

export const getRepositoryDetails = (githubURL: string): Maybe<RepositoryDetails> => {
    const parsedGithubURL = parseGithubURL(githubURL);

    if (isNil(parsedGithubURL.repository)) return null;

    const repositoryFullNameSplit = parsedGithubURL.repository.split('/');
    if (repositoryFullNameSplit.length !== 2) return null;

    return {
        owner: repositoryFullNameSplit[0],
        name: repositoryFullNameSplit[1]
    };
}