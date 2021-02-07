import {expect} from "chai";
import request from 'supertest';
import {SinonStub, stub} from 'sinon';

import {app} from "../../app";
import * as fetchRepositoryContributorsStatsModule from "../../../github-integration/fetchRepositoryContributorsStats";
import {
    CanNotFetchRepositoryStatistics,
    ContributorStats,
    RepositoryNotFound
} from "../../../github-integration/fetchRepositoryContributorsStats";
import {CustomErrorName, getErrorCode, getErrorMessage} from "../errors";

describe('Fetching repository contributors stats using GraphQL.', () => {
    let fetchRepositoryContributorsStatsMock: SinonStub<[string, string]>;

    beforeAll(() => {
        fetchRepositoryContributorsStatsMock = stub(
            fetchRepositoryContributorsStatsModule,
            'fetchRepositoryContributorsStats'
        );
    });

    beforeEach(() => {
        fetchRepositoryContributorsStatsMock.reset();
    });

    test('CAN fetch statistics for existing repository.', async () => {
        // Given
        const dummyRepositoryOwner = 'dummy-owner';
        const dummyRepositoryName = 'dummy-repo';
        const contributorsStats: ContributorStats[] = [{
            name: 'dummy-name',
            avatarUrl: 'http://dummy-avatar.url',
            additions: 5,
            deletions: 3
        }];
        fetchRepositoryContributorsStatsMock.returns(Promise.resolve(contributorsStats));

        // When
        return request(app)
            .post("/graphql")
            .send({ query: createGraphQLQuery(dummyRepositoryOwner, dummyRepositoryName) })
            .set("Accept", "application/json")
            // Then
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(fetchRepositoryContributorsStatsMock).to.be.calledOnceWith(
                    dummyRepositoryOwner,
                    dummyRepositoryName
                );

                const expectResponseBody = {
                    data: {
                        contributorsStats: contributorsStats
                    }
                };
                expect(response.body).to.be.deep.equalInAnyOrder(expectResponseBody);
            });
    });

    test.each([
        [ CustomErrorName.RepositoryNotFound, RepositoryNotFound ],
        [ CustomErrorName.CanNotFetchRepositoryStats, CanNotFetchRepositoryStatistics ],
    ])('CAN NOT fetch statistics when there is an error (%s).', async (
        expectedErrorCode,
        givenError
    ) => {
        // Given
        const dummyRepositoryOwner = 'dummy-owner';
        const dummyRepositoryName = 'dummy-repo';
        fetchRepositoryContributorsStatsMock.rejects(new givenError());

        // When
        return request(app)
            .post("/graphql")
            .send({ query: createGraphQLQuery(dummyRepositoryOwner, dummyRepositoryName) })
            .set("Accept", "application/json")
            // Then
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(fetchRepositoryContributorsStatsMock).to.be.calledOnceWith(
                    dummyRepositoryOwner,
                    dummyRepositoryName
                );

                const expectResponseBody = {
                    errors: [{
                        errorName: expectedErrorCode,
                        message: getErrorMessage(expectedErrorCode),
                        statusCode: getErrorCode(expectedErrorCode),
                    }],
                    data: {
                        contributorsStats: null
                    }
                };

                expect(response.body).to.be.deep.equalInAnyOrder(expectResponseBody);
            });

    });
});

const createGraphQLQuery = (repositoryOwner: string, repositoryName: string): string => {
    return `
        {
          contributorsStats(
            repositoryOwner: "${repositoryOwner}", 
            repositoryName: "${repositoryName}"
            ) {
                name
                avatarUrl
                additions
                deletions
            }
        }
    `;
}