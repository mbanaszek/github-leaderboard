import nock from "nock";
import { expect } from "chai";

import {
    CanNotFetchRepositoryStatistics,
    ContributorStats,
    fetchRepositoryContributorsStats,
    RepositoryNotFound,
    ApiResponseData
} from "../fetchRepositoryContributorsStats";

describe("Fetching contributors statistics from GitHub.", () => {

    test("CAN fetch statistics for existing repository.", async () => {
        // Given
        const dummyRepositoryOwner = "dummy-owner";
        const dummyRepositoryName = "dummy-repo";

        const expectedContributorsStatistics: ContributorStats[] = [{
            name: "dummy-name",
            avatarUrl: "http://dummy-avatar.url",
            additions: 5,
            deletions: 3
        }];

        stubGitHubAPISuccessResponse(dummyRepositoryOwner, dummyRepositoryName, expectedContributorsStatistics);

        // When
        const actualContributorsStatistics = await fetchRepositoryContributorsStats(
            dummyRepositoryOwner,
            dummyRepositoryName
        );

        // Then
        expect(actualContributorsStatistics).to.be.deep.equalInAnyOrder(expectedContributorsStatistics);
    });

    test("CAN NOT fetch statistics for not existing repository.", async () => {
        // Given
        const dummyRepositoryOwner = "dummy-owner";
        const dummyRepositoryName = "dummy-repo";

        stubGitHubAPIFailureResponse(dummyRepositoryOwner, dummyRepositoryName, 404);

        // When & Then
        await expect(fetchRepositoryContributorsStats(
            dummyRepositoryOwner,
            dummyRepositoryName
        )).to.be.rejectedWith(RepositoryNotFound);
    });

    test("CAN NOT fetch statistics when there is a GitHub 500 error.", async () => {
        // Given
        const dummyRepositoryOwner = "notExistingOwner";
        const dummyRepositoryName = "notExistingRepositoryName";

        stubGitHubAPIFailureResponse(dummyRepositoryName, dummyRepositoryOwner, 500);

        // When & Then
        await expect(fetchRepositoryContributorsStats(
            dummyRepositoryOwner,
            dummyRepositoryName
        )).to.be.rejectedWith(CanNotFetchRepositoryStatistics);
    });

    beforeAll(() => {
        nock.disableNetConnect();
    });

    beforeEach(() => {
        nock.cleanAll();
    });

    afterAll(() => {
        nock.enableNetConnect();
    });
});

const stubGitHubAPISuccessResponse = (repositoryOwnerLogin: string, repositoryName: string, contributorsStats: ContributorStats[]): void => {
    const responseData: ApiResponseData = contributorsStats.map((contributorStats) => ({
        author: {
            login: contributorStats.name,
            avatar_url: contributorStats.avatarUrl
        },
        weeks: [{
            a: contributorStats.additions,
            d: contributorStats.deletions
        }]
    }));

    nock("https://api.github.com")
        .get(`/repos/${repositoryOwnerLogin}/${repositoryName}/stats/contributors`)
        .reply(200, responseData);
};

const stubGitHubAPIFailureResponse = (repositoryOwnerLogin: string, repositoryName: string, HTTPStatusCode: 404 | 500): void => {
    nock("https://api.github.com")
        .get(`/repos/${repositoryOwnerLogin}/${repositoryName}/stats/contributors`)
        .reply(HTTPStatusCode);
};