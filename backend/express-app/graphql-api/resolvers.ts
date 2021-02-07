import {
    CanNotFetchRepositoryStatistics,
    ContributorStats,
    fetchRepositoryContributorsStats,
    RepositoryNotFound
} from "../../github-integration/fetchRepositoryContributorsStats";
import { CustomErrorName } from "./errors";

export const root = {
    contributorsStats: async (args: {repositoryOwner: string, repositoryName: string}): Promise<ContributorStats[]> => {
        try {
            return await fetchRepositoryContributorsStats(args.repositoryOwner, args.repositoryName);
        } catch (error) {
            if (error instanceof RepositoryNotFound) throw new Error(CustomErrorName.RepositoryNotFound);
            if (error instanceof CanNotFetchRepositoryStatistics) throw new Error(CustomErrorName.CanNotFetchRepositoryStats);

            // TODO: log the error.
            // console.error(JSON.stringify(error, null, 2));

            throw new Error(CustomErrorName.UnknownError);
        }
    },
};
