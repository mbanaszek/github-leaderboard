import { Maybe } from "../functional/maybe";
import parseGithubURL from "parse-github-url";
import { isNil } from "../functional/logic";

export type RepositoryDetails = {
    owner: string;
    name: string;
}

export const getRepositoryDetails = (githubURL: string): Maybe<RepositoryDetails> => {

    const parsedGithubURL = parseGithubURL(githubURL);

    if (isNil(parsedGithubURL) || isNil(parsedGithubURL.repository)) return null;

    const repositoryFullNameSplit = parsedGithubURL.repository.split("/");
    if (repositoryFullNameSplit.length !== 2) return null;

    return {
        owner: repositoryFullNameSplit[0],
        name: repositoryFullNameSplit[1]
    };
};