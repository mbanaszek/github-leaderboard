import nock from "nock";
import { expect } from 'chai';

import {
    CanNotFetchRepositoryStatistics,
    ContributorStats,
    fetchRepositoryContributorsStats,
    RepositoryNotFound,
    ResponseData
} from "./fetchRepositoryContributorsStats";

describe('Fetching contributors statistics from GitHub.', () => {

    beforeAll(() => {
        nock.disableNetConnect();
    });

    beforeEach(() => {
        nock.cleanAll();
    });

    afterAll(() => {
        nock.enableNetConnect();
    });

    test('CAN fetch statistics for existing repository.', async () => {
        // Given
        const dummyOwnerName = 'dummy-owner';
        const dummyRepositoryName = 'dummy-repo';

        const expectedContributorsStatistics: ContributorStats[] = [{
            name: 'dummy-name',
            avatarUrl: 'http://dummy-avatar.url',
            additions: 5,
            deletions: 3
        }];

        stubGitHubAPISuccessResponse(dummyOwnerName, dummyRepositoryName, expectedContributorsStatistics);

        // When
        const actualContributorsStatistics = await fetchRepositoryContributorsStats(
            dummyOwnerName,
            dummyRepositoryName
        );

        // Then
        expect(actualContributorsStatistics).to.be.deep.equalInAnyOrder(expectedContributorsStatistics);
    });

    test('CAN NOT fetch statistics for not existing repository.', async () => {
        // Given
        const dummyOwnerName = 'notExistingOwner';
        const dummyRepositoryName = 'notExistingRepositoryName';

        stubGitHubAPIFailureResponse(dummyRepositoryName, dummyOwnerName, 404);

        // When & Then
        await expect(fetchRepositoryContributorsStats(
            dummyOwnerName,
            dummyRepositoryName
        )).to.be.rejectedWith(RepositoryNotFound)
    });

    test('CAN NOT fetch statistics when there is a GitHub 500 error.', async () => {
        // Given
        const dummyOwnerName = 'notExistingOwner';
        const dummyRepositoryName = 'notExistingRepositoryName';

        stubGitHubAPIFailureResponse(dummyRepositoryName, dummyOwnerName, 500);

        // When & Then
        await expect(fetchRepositoryContributorsStats(
            dummyOwnerName,
            dummyRepositoryName
        )).to.be.rejectedWith(CanNotFetchRepositoryStatistics)
    });
});

const stubGitHubAPISuccessResponse = (repositoryOwnerLogin: string, repositoryName: string, contributorsStats: ContributorStats[]): void => {
    const responseData: ResponseData = contributorsStats.map((contributorStats) => ({
        author: {
            login: contributorStats.name,
            avatar_url: contributorStats.avatarUrl
        },
        weeks: [{
            a: contributorStats.additions,
            d: contributorStats.deletions
        }]
    }));

    nock('https://api.github.com')
        .get(`/repos/${repositoryOwnerLogin}/${repositoryName}/stats/contributors`)
        .reply(200, responseData);
}

const stubGitHubAPIFailureResponse = (repositoryOwnerLogin: string, repositoryName: string, HTTPStatusCode: 404 | 500): void => {
    nock('https://api.github.com')
        .persist()
        .get(`/repos/${repositoryOwnerLogin}/${repositoryName}/stats/contributors`)
        .reply(HTTPStatusCode, {});

}